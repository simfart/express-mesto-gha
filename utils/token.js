const JWT = require('jsonwebtoken');

const SECRET_KEY = 'SECRET';

function generateToken(payload) {
  const token = JWT.sign(payload, SECRET_KEY, { expiresIn: '7d' });
  return token;
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return JWT.verify(token, SECRET_KEY);
  } catch {
    return false;
  }
}

module.exports = { generateToken, checkToken };
