/** @module:PrivateGroupTokens */

/** API to handle group token and local storage */
export class PrivateGroupTokens {
  /**
   * LocalStorage entry for private group tokens
   *
   * @private
   * @static
   * */
  static _ENTRY_ = 'CollabifyPrivateGroupTokens';

  /**
   * Maps/overrides a `groupID:token` in private group local storage entry
   *
   * @public
   * @static
   * @param {string} groupID - private group ID
   * @param {string} access_token - JWT token
   */
  static setGroupToken(groupID, access_token) {
    if (typeof window === 'undefined') return;

    const tokens = this._getGroupTokens();
    tokens[groupID] = access_token;
    localStorage.setItem(this._ENTRY_, JSON.stringify(tokens));
  }

  /**
   * Gets the `access_token` of the provided `groupID`
   *
   * @public
   * @static
   * @param {string} groupID
   * @return {string | null} jwtToken
   */
  static getGroupToken(groupID) {
    const tokens = this._getGroupTokens();
    return tokens[groupID];
  }

  /**
   * Get/initialize the entry of private group token in local storage
   *
   * @private
   * @static
   * @returns {Record<string, string>} privateGroupTokens
   */
  static _getGroupTokens() {
    const savedGroups = localStorage.getItem(this._ENTRY_);
    const tokens = savedGroups ? JSON.parse(savedGroups) : {};
    return tokens;
  }
}
