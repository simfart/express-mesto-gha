class AuthError extends Error {
  constructor(message) {
    super(message);
    // this.message = 'Неправильные почта или пароль';
    this.statusCode = 401;
  }
}

module.exports = AuthError;
