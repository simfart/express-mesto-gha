const Card = require('../models/card');
const errors = require('../utils/errorCard');

const getCard = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((e) => errors(e, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((e) => {
      const errMessage = 'Переданы некорректные данные при создании карточки.';
      errors(e, res, errMessage);
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('Not found'))
    .then((card) => res.send({ data: card }))
    .catch((e) => errors(e, res));
};

const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    .orFail(new Error('Not found'))
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((e) => errors(e, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('Not found'))
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((e) => errors(e, res));
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
