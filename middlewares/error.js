const mongoose = require('mongoose');

const UNAUTHORIZED_ERROR = 401;
const INTERNAL_SERVER_ERROR = 500;
const ERROR_CODE = 400;
const NOT_FOUND = 404;

const NotFoundError = require('../utils/errors/not-found-err');

const { ValidationError, CastError, DocumentNotFoundError } = mongoose.Error;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

// const errorMiddleWare = (err, req, res, next) => {
//   console.log('ошибка ', err);
//   if (err instanceof ValidationError) {
//     return res.status(ERROR_CODE).send({ message: err.message });
//   }
//   if (err instanceof DocumentNotFoundError) {
//     return res.status(NOT_FOUND).send({ message: err.message });
//   }
//   if (err instanceof CastError) {
//     return res.status(ERROR_CODE).send({ message: err.message });
//   }
//   return res.status(500).send({ message: 'hhhhhhh' });
// };

// module.exports = errorMiddleWare;
