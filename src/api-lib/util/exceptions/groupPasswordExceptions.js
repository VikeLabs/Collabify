class GroupPasswordError extends Error {
  constructor({ message, groupID }) {
    super(message);
    this.groupID = groupID;
  }
}

export { GroupPasswordError };
