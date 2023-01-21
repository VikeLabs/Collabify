import bcrypt from 'bcrypt';
import { GroupPasswords } from 'api-lib/model/groupPw';
import {
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
} from 'api-lib/util/exceptions';
// TODO: exceptions error utils have been nuked please update

/**
 * validateGroupPassword
 * @param {{ groupID: string, password: string }} credentials
 * @param {(err: ApiError | null) => void} callback: handling error
 *
 * err could be InternalServerError, NotFoundError or UnauthorizedError
 */
export const validateGroupPassword = (credentials, callback) => {
  const { groupID, password } = credentials;
  GroupPasswords.findOne({ group: groupID }, (err, groupFound) => {
    if (err) return callback(new InternalServerError(err));

    if (!groupFound)
      return callback(new NotFoundError(`Group not found: ${groupID}`)); // doc not found

    const hashedPassword = groupFound.password;

    bcrypt.compare(password, hashedPassword, (pwError, matched) => {
      if (pwError) return callback(new InternalServerError(err));
      if (!matched) return callback(new UnauthorizedError());

      return callback(null);
    });
  });
};
