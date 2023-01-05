import jwt from 'jsonwebtoken';
import { UnauthorizedError } from 'api-lib/util/exceptions';

const SECRET = process.env.PRIVATE_GROUP_SECRET;

/**
 * verifyJwt
 * @param {string} token
 * @param {(decodedToken: string) => void} callback
 */
export const verifyJwt = (token, callback) => {
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      throw new UnauthorizedError();
    }
    callback(decodedToken);
  });
};

/**
 * signJWT
 * @param {{[key:string] : string}} content: map claims of a jwt
 * @return {string}: a signed jwt token
 */
export const signJWT = (content) => {
  return jwt.sign(content, SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
};
