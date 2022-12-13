class GroupPasswordError extends Error {
  constructor({ message, groupID }) {
    super(message);
    this.groupID = groupID;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
  }
}

export { GroupPasswordError, UnauthorizedError };
