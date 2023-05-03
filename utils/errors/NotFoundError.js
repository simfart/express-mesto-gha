class NotFoundError extends Error {
  constructor(message) {
    super(message);
    // this.message = 'Страница не найдена';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
