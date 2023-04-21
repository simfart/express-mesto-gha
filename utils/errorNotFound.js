const errorNotFound = (req, res) => {
  res.status(404).send({ message: '404 Not Found' });
};

module.exports = errorNotFound;
