const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const urlrRegex = require('../utils/constants');

const errCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlrRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

const errLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const errUpdateName = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const errUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlrRegex),
  }),
});

const errCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlrRegex),
  }),
});

const errCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
});

const errUserdId = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

module.exports = {
  errCreateUser, errLogin, errUserdId, errUpdateName, errUpdateAvatar, errCreateCard, errCardId,
};
