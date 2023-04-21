const mongoose = require('mongoose');
const User = require('../models/user');
const errors = require('../utils/errorUser');

const { DocumentNotFoundError } = mongoose.Error;

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((e) => {
      const errMassege = 'Переданы некорректные данные при создании пользователя';
      errors(e, res, errMassege);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((e) => errors(e, res));
};

const getUser = (req, res) => {
  User
    .findById(req.params.userId)
    .orFail(new DocumentNotFoundError())
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      errors(e, res);
    });
};

const updateUser = (req, res, data) => {
  User.findByIdAndUpdate(req.user._id, data, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new DocumentNotFoundError())
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      const errMassege = 'Переданы некорректные данные при обновлении профиля.';
      errors(e, res, errMassege);
    });
};

const updateName = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about });
};

const updateAvatar = (req, res) => {
  const avatar = req.body;
  updateUser(req, res, avatar);
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateName,
  updateAvatar,
};
