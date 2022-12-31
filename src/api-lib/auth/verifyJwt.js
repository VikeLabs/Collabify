import { verify } from 'jsonwebtoken';
import { UnauthorizedError } from 'api-lib/util/exceptions';

const SECRET = process.env.PRIVATE_GROUP_SECRET;

export const verifyJwt = (token, callback) => {
  verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      throw new UnauthorizedError();
    }
    callback(decodedToken);
  });
};
