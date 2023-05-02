const JWT = require('jsonwebtoken');

const SECRET_KEY = 'SECRET';
const TokenError = require('../utils/TokenError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new TokenError());
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = JWT.verify(token, SECRET_KEY);
  } catch {
    return next(new TokenError());
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
module.exports = auth;
