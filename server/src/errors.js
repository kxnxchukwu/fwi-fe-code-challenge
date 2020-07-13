class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  toString() {
    return JSON.stringify({
      name: this.name,
      message: this.message,
      status: this.status,
    });
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(message);
    this.status = 404;
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(err instanceof CustomError && err.status ? err.status : 500);
  res.send(err.message || 'Internal Server Error');
}

module.exports = {
  CustomError,
  BadRequestError,
  NotFoundError,
  errorHandler,
};
