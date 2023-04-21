const errors = require('./error');

const errMessageNotFound = 'Пользователь по указанному _id не найден.';

const errorsCard = (err, res, errMessage) => {
  errors(err, res, errMessage, errMessageNotFound);
};

module.exports = errorsCard;
