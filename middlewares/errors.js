const mongoose = require('mongoose');

const { ValidationError, CastError, DocumentNotFoundError } = mongoose.Error;

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const DUPLICATE_KEY_ERROR = 409;

const errorsMiddleWare = (err, req, res, next) => {
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({ message: err.query });
  }
  if (err.code === 11000) {
    return res.status(DUPLICATE_KEY_ERROR).send({ message: 'E-mail уже зарегестрирован' });
  }
  if (err instanceof ValidationError) {
    return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
  }
  if (err instanceof CastError) {
    return res.status(ERROR_CODE).send({ message: 'Не корректный id' });
  }
  if (!err.statusCode) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  }
  res.status(err.statusCode).send({ message: err.message });
  return next();
};

module.exports = errorsMiddleWare;
