/**
 * ApiError(error, statusCode)
 * @class
 * @constructor
 *
 * @param {(Error | string)} [error] - to be logged
 * @param {number} statusCode - http status code
 * */
export class ApiError {
  statusCode: number;
  constructor(error: Error | string | null, statusCode: number) {
    if (error) {
      console.log(error);
    }
    this.statusCode = statusCode;
  }
}
