const User = require('../models/user');
const errors = require('../utils/errorUser');

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
    .orFail(new Error('Not found'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => errors(e, res));
};

const updateName = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new Error('Not found'))
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      const errMassege = 'Переданы некорректные данные при обновлении профиля.';
      errors(e, res, errMassege);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new Error('Not found'))
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      const errMassege = 'Переданы некорректные данные при обновлении аватара';
      errors(e, res, errMassege);
    });
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateName,
  updateAvatar,
};
