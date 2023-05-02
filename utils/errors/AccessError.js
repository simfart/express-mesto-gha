class AccessError extends Error {
  constructor() {
    super();
    this.message = 'Ошибка доступа';
    this.statusCode = 403;
  }
}

module.exports = AccessError;
