class InvalidArguments extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidArguments';
    this.message = message;
  }
}

export { InvalidArguments };
