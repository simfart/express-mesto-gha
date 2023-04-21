const ERROR_CODE = 400;
const NOT_FOUND = 404;

const errors = (err, res, errMassege) => {
//   const message = Object.values(err.errors).map((error) => error.message).join('; ');
  if (err.name === 'ValidationError') {
    return res.status(ERROR_CODE).send({ message: errMassege });
  }
  if (err.message === 'Not found' || err.message.includes('Cast to ObjectId failed')) {
    return res.status(NOT_FOUND).send({ message: errMassege });
  }
  // if (err.message === 'Not found' || err.message.includes('Cast to ObjectId failed')) {
  //   return res.status(NOT_FOUND).send({ message: errMassege });
  // }

  return res.status(500).send({ message: 'Произошла ошибка' });
};

module.exports = errors;
