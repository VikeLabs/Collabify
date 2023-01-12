/**
 * @typedef {Object} PrivateGroupToken
 * @property {string} groupID
 * @property {string} access_token
 */

export class PrivateGroupTokens {
  /**
   * @private
   * @type {string}
   * localStorage entry for private group tokens
   * */
  static _ENTRY_ = 'CollabifyPrivateGroupTokens';

  /**
   * @public
   * @param {PrivateGroupToken} data
   */
  static setGroupToken(groupID, access_token) {
    if (typeof window === 'undefined') return;

    const tokens = this._getGroupTokens();
    tokens[groupID] = access_token;
    localStorage.setItem(this._ENTRY_, JSON.stringify(tokens));
  }

  /**
   * @public
   * @static
   * @param {string} groupID
   * @return {(string | null)} jwtToken
   */
  static getGroupToken(groupID) {
    const tokens = this._getGroupTokens();
    return tokens[groupID];
  }

  /**
   * @private
   * @returns {PrivateGroupToken[]} privateGroupTokens
   */
  static _getGroupTokens() {
    const savedGroups = localStorage.getItem(this._ENTRY_);
    const privateGroupTokens = savedGroups ? JSON.parse(savedGroups) : {};
    return privateGroupTokens;
  }
}
