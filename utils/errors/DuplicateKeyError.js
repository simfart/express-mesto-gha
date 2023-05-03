class DuplicateKeyError extends Error {
  constructor() {
    super();
    this.message = 'E-mail уже зарегестрирован';
    this.statusCode = 409;
  }
}

module.exports = DuplicateKeyError;
