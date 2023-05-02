const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/token');

const { DocumentNotFoundError } = mongoose.Error;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

const getUsersMe = (req, res, next) => {
  console.log(req.user);
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new DocumentNotFoundError('Нет пользователя с таким id'));
      }
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

const getUserId = (req, res, next) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .orFail(new DocumentNotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next, data) => {
  User.findByIdAndUpdate(req.user._id, data, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new DocumentNotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

const updateName = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, next, { name, about });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req, res, next, { avatar });
};

const createUser = (req, res, next) => {
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
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const payload = { _id: user.id, email: user.email };
      const token = generateToken(payload);
      // вернём токен
      res
        .cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
          maxAge: 3600000,
          httpOnly: true,
        });
      res.status(200).send({ token });
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  getUserId,
  getUsers,
  updateName,
  updateAvatar,
  login,
  getUsersMe,
};
