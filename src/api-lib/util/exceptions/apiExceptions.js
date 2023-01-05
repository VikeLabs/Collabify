/**
 * ApiError
 * @class
 * @constructor
 */
class ApiError {
  /**
   * @constructs ApiError
   * @param {string} message
   * @param {number} statusCode
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
   * @param {string} message
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
   * @param {Error | string} err
   */
  constructor(err) {
    super('Something went wrong, try again later.', 500);
    console.log(err);
  }
}

export { ApiError, UnauthorizedError, NotFoundError, InternalServerError };
