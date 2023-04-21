const errors = require('./error');

const errNotFound = 'Карточка с указанным _id не найдена';
const errIncorrectId = 'Карточка с некорректным id';

const errorsCard = (err, res, errMessage) => {
  errors(err, res, errMessage, errNotFound, errIncorrectId);
};

module.exports = errorsCard;
