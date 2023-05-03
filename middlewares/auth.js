const JWT = require('jsonwebtoken');

const SECRET_KEY = 'SECRET';
const { AuthError } = require('../utils/errors');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = JWT.verify(token, SECRET_KEY);
  } catch {
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
module.exports = auth;
