const AccessError = require('./AccessError');
const AuthError = require('./AuthError');
const NotFoundError = require('./NotFoundError');
const DuplicateKeyError = require('./DuplicateKeyError');
const ValidationError = require('./ValidationError');

module.exports = {
  AccessError, AuthError, NotFoundError, DuplicateKeyError, ValidationError,
};
