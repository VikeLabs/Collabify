import { verify } from 'jsonwebtoken';
import { UnauthorizedError } from 'api-lib/util/exceptions';

const SECRET = process.env.PRIVATE_GROUP_SECRET;

export const verifyJwt = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, SECRET, (err, decodedToken) => {
      if (err) return reject(new UnauthorizedError(err));

      return resolve(decodedToken);
    });
  });
};
