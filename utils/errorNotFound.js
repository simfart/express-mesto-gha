const errorNotFound = (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};

module.exports = errorNotFound;
