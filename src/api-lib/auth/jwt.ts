import jsonwebtoken from 'jsonwebtoken';
import { ApiError } from 'api-lib/util/apiError';

interface PrivateGroupToken {
  groupToken?: string;
  err?: ApiError;
}

export class JsonWebToken {
  private static secret = process.env.PRIVATE_GROUP_SECRET;
  private static expiryTime = 7 * 24 * 60 * 60;

  public static signPrivateGroupToken(token: string): string {
    return jsonwebtoken.sign({ access_token: token }, this.secret, {
      expiresIn: this.expiryTime,
    });
  }

  public static getPrivateGroupToken(token: string): PrivateGroupToken {
    try {
      const decoded = jsonwebtoken.verify(token, this.secret);
      const groupToken = decoded['access_token'];

      if (!groupToken) {
        return { err: new ApiError('access_token not found', 401) };
      }

      return { groupToken };
    } catch (e) {
      return { err: new ApiError(e, 401) };
    }
  }
}
