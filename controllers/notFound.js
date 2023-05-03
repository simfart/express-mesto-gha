const { NotFoundError } = require('../utils/errors');

const notFound = (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
};

module.exports = notFound;
