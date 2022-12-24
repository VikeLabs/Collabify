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
 * @public
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
 * @public
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

export { UnauthorizedError, NotFoundError };
