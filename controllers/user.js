/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errors = require('../utils/errorUser');

const { DocumentNotFoundError } = mongoose.Error;

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
  // User.create({
  //   name, about, avatar, email, password,
  // })
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
    .findById(req.user._id)
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
  const { avatar } = req.body;
  updateUser(req, res, { avatar });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      // вернём токен
      res
        .cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
          maxAge: 3600000,
          httpOnly: true,
        });
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateName,
  updateAvatar,
  login,
};
