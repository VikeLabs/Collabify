/**
 * ApiError
 * @class
 * @constructor
 * @abstract
 */
class ApiError {
  /**
   * @constructs ApiError
   * @param {string} message: error message
   * @param {number} statusCode: http status code
   */
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

/**
 * UnauthorizedError
 * @class
 * @constructor
 * @extends ApiError
 *
 * `this.message`: "Unauthorized Access"
 * `this.statusCode`: 401
 */
class UnauthorizedError extends ApiError {
  constructor() {
    super('Unauthorized Access', 401);
  }
}

/**
 * NotFoundError
 * @class
 * @constructor
 * @extends ApiError
 *
 * Default:
 * `statusCode`: 404
 */
class NotFoundError extends ApiError {
  /**
   * @constructs ApiError
   * @param {string} message: to be displayed in frontend
   */
  constructor(message) {
    super(message, 404);
  }
}

/**
 * InternalServerError
 * @class
 * @constructor
 * @extends ApiError
 */
class InternalServerError extends ApiError {
  /**
   * constructor
   * @param {Error | string} err: an instance of `Error` or a string describing the error
   *
   * An instance of this object will log out the error
   */
  constructor(err) {
    super('Something went wrong, try again later.', 500);
    console.error(err);
  }
}

export { ApiError, UnauthorizedError, NotFoundError, InternalServerError };
