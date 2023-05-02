const JWT = require('jsonwebtoken');

const SECRET_KEY = 'SECRET';
const { TokenError } = require('../utils/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new TokenError();
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = JWT.verify(token, SECRET_KEY);
  } catch {
    throw new TokenError();
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
module.exports = auth;
