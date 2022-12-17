class GroupPasswordError extends Error {
  constructor({ message, groupID }) {
    super(message);
    this.groupID = groupID;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized access') {
    super(message);
  }
}

export { GroupPasswordError, UnauthorizedError };
