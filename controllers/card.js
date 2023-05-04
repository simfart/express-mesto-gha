const Card = require('../models/card');

const { AccessError, NotFoundError, ValidationError } = require('../utils/errors');

const getCard = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(' Переданы некорректные данные при создании карточки. '));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new AccessError());
      }
      return Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.send({ data: card }));
    })
    .catch(next);
};
const likeDeleteCard = (req, res, next, keyMethod) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      keyMethod,
      { new: true },
    )
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  // добавить _id в массив, если его там нет
  const keyMethod = { $addToSet: { likes: req.user._id } };
  likeDeleteCard(req, res, next, keyMethod);
};

const dislikeCard = (req, res, next) => {
  // убрать _id из массива
  const keyMethod = { $pull: { likes: req.user._id } };
  likeDeleteCard(req, res, next, keyMethod);
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
