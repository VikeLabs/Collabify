export const PRIVATE_GROUP_ACCESS_TOKENS = '';

/**
 * @typedef {Object} NewGroupResponse
 * @property {string} groupID
 * @property {string} [access_token]
 */

export class PrivateGroupTokens {
  /** @private */
  static _privateGroup_entry = 'CollabifyPrivateGroupTokens';

  /**
   * @public
   * @param {NewGroupResponse} data
   */
  static saveGroupToken(data) {
    if (typeof window === 'undefined') return;

    const privateGroupTokens = this._getInitialState();

    // considering people are more likely going to revisit
    // their previous recent group.. `unshift` makes it faster
    // for querying later.
    privateGroupTokens.unshift(data);

    localStorage.setItem(
      this._privateGroup_entry,
      JSON.stringify(privateGroupTokens)
    );
  }

  /**
   * @private
   */
  static _getInitialState() {
    const savedGroups = localStorage.getItem(this._privateGroup_entry);
    console.log(savedGroups);
    const privateGroupTokens = savedGroups ? JSON.parse(savedGroups) : [];
    return privateGroupTokens;
  }
}
