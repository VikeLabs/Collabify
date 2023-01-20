import jsonwebtoken from 'jsonwebtoken';
import { ApiError } from 'api-lib/util/apiError';

interface JWTVerifyResult<T> {
  decodedToken?: T;
  error?: ApiError;
}

export class JsonWebToken {
  private static secret = process.env.PRIVATE_GROUP_SECRET;

  public static sign(content: any): string {
    return jsonwebtoken.sign(content, this.secret, {
      expiresIn: 60 * 60 * 24 * 7,
    });
  }

  public static verify<T>(token: string): JWTVerifyResult<T> {
    try {
      const decodedToken = jsonwebtoken.verify(token, this.secret) as T;
      return { decodedToken };
    } catch (e) {
      return { error: new ApiError(e, 401) };
    }
  }
}

// export const verifyJwt = (token: string, callback: ()) => {
//   jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {
//     if (err) {
//       throw new ApiError(e, 500);
//     }
//     callback(decodedToken);
//   });
// };

// export const signJWT = (content: any) => {
//   return jsonwebtoken.sign(content, SECRET, {
//     expiresIn: 60 * 60 * 24 * 7,
//   });
// };
