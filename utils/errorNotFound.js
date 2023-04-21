const NOT_FOUND = 404;

const errorNotFound = (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
};

module.exports = errorNotFound;
