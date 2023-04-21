const mongoose = require('mongoose');
const Card = require('../models/card');
const errors = require('../utils/errorCard');

const { DocumentNotFoundError } = mongoose.Error;

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
    .orFail(new DocumentNotFoundError())
    .then((card) => res.send({ data: card }))
    .catch((e) => errors(e, res));
};
const likeDeleteCard = (req, res, keyMethod) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      keyMethod,
      { new: true },
    )
    .orFail(new DocumentNotFoundError())
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((e) => errors(e, res));
};

const likeCard = (req, res) => {
  // добавить _id в массив, если его там нет
  const keyMethod = { $addToSet: { likes: req.user._id } };
  likeDeleteCard(req, res, keyMethod);
};

const dislikeCard = (req, res) => {
  // убрать _id из массива
  const keyMethod = { $pull: { likes: req.user._id } };
  likeDeleteCard(req, res, keyMethod);
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
