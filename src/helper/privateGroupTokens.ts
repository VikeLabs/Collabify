interface LocalStorageTokens {
  [key: string]: string;
}

export class PrivateGroupTokens {
  static _ENTRY_ = 'CollabifyPrivateGroupTokens';

  static setGroupToken(groupID: string, access_token: string): void {
    if (typeof window === 'undefined') return;

    const tokens = this._getGroupTokens();
    tokens[groupID] = access_token;
    localStorage.setItem(this._ENTRY_, JSON.stringify(tokens));
  }

  static getGroupToken(groupID: string): string | undefined {
    const tokens = this._getGroupTokens();
    return tokens[groupID];
  }

  static _getGroupTokens(): LocalStorageTokens {
    const savedGroups = localStorage.getItem(this._ENTRY_);
    const tokens = savedGroups ? JSON.parse(savedGroups) : {};
    return tokens;
  }
}
