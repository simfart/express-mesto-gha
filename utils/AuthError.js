class AuthError extends Error {
  constructor() {
    super();
    this.message = 'Неправильные почта или пароль';
    this.statusCode = 401;
  }
}

module.exports = AuthError;
