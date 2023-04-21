const errors = require('./error');

const errNotFound = 'Пользователь по указанному _id не найден.';
const errIncorrectId = 'Пользователь с некорректным id';

const errorsCard = (err, res, errMessage) => {
  errors(err, res, errMessage, errNotFound, errIncorrectId);
};

module.exports = errorsCard;
