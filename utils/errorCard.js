const errors = require('./error');

const errMessageNotFound = 'Карточка с указанным _id не найдена';

const errorsCard = (err, res, errMessage) => {
  errors(err, res, errMessage, errMessageNotFound);
};

module.exports = errorsCard;
