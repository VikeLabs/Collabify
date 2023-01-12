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
  static saveGroupToken(data) {
    if (typeof window === 'undefined') return;

    const tokens = this._getGroupTokens();

    // if token exists
    const token = tokens.find((token) => token.groupID === data.groupID);
    if (!token) {
      tokens.push(data);
    } else {
      token.access_token = data.access_token;
    }

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
    const groupToken = tokens.find((token) => token.groupID === groupID);

    if (!groupToken) return null;

    return groupToken.access_token;
  }

  /**
   * @private
   * @returns {PrivateGroupToken[]} privateGroupTokens
   */
  static _getGroupTokens() {
    const savedGroups = localStorage.getItem(this._ENTRY_);
    const privateGroupTokens = savedGroups ? JSON.parse(savedGroups) : [];
    return privateGroupTokens;
  }
}
