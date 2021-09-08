export class CustomError extends Error {
  constructor(message: string, public status: number) {
    super(message);

    this.name = this.constructor.name;
  }
}

export class BadRequestError extends CustomError {
  constructor(public reason?: string) {
    super('Bad Request', 400);
  }
}

export class NotFoundError extends CustomError {
  constructor() {
    super('Not Found', 404);
  }
}

export class InternalServerError extends CustomError {
  constructor() {
    super('Internal Server Error', 500);
  }
}
