const ERROR_CODE = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const messageError = 'Произошла ошибка';

const errors = (err, res, errMessage, errNotFound, errIncorrectId) => {
  if (err.name === 'ValidationError') {
    return res.status(ERROR_CODE).send({ message: errMessage });
  }
  // if (err.message === 'Not found' || err.message.includes('Cast to ObjectId failed')) {
  //   return res.status(NOT_FOUND).send({ message: errMessageNotFound });
  // }
  if (err.message === 'Not found') {
    return res.status(NOT_FOUND).send({ message: errNotFound });
  }
  if (err.message.includes('Cast to ObjectId failed')) {
    return res.status(ERROR_CODE).send({ message: errIncorrectId });
  }
  return res.status(INTERNAL_SERVER_ERROR).send({ message: messageError });
};

module.exports = errors;
