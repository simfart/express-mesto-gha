const mongoose = require('mongoose');

const { ValidationError, CastError, DocumentNotFoundError } = mongoose.Error;

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const messageError = 'На сервере произошла ошибка';

const errors = (err, res, errMessage, errNotFound, errIncorrectId) => {
  if (err instanceof ValidationError) {
    return res.status(ERROR_CODE).send({ message: errMessage });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({ message: errNotFound });
  }
  if (err instanceof CastError) {
    return res.status(ERROR_CODE).send({ message: errIncorrectId });
  }
  return res.status(INTERNAL_SERVER_ERROR).send({ message: messageError });
};

module.exports = errors;
