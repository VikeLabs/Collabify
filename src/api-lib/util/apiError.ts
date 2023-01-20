export class ApiError {
  statusCode: number;
  constructor(error: Error | string | null, statusCode: number) {
    if (error) {
      console.log(error);
    }
    this.statusCode = statusCode;
  }
}
