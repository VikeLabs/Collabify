import { validateGroupPassword } from 'api-lib/db/private_password';
import { ApiError } from 'api-lib/util/exceptions';
import { signJWT } from 'api-lib/auth';
import { Cookie } from 'api-lib/requests/cookie';
import dbConnect from 'api-lib/dbConnect';

export default function (req, res) {
  return new Promise(async (resolve) => {
    const { groupID } = req.query;
    const { password } = req.body;

    if (password === '' || !password) {
      res.status(400).json({ message: 'missing password' });
      return resolve();
    }

    await dbConnect();
    switch (req.method) {
      case 'POST':
        {
          validateGroupPassword({ groupID, password }, (error) => {
            if (error !== null || error instanceof ApiError) {
              res.status(error.statusCode).json({ message: error.message });
              return resolve();
            }

            // group validated, send back credentials
            const cookie = Cookie.New(req, res);
            const token = signJWT({ groupID });
            cookie.setPrivateGroupToken(token);

            res.status(200).json();
            return resolve();
          });
        }
        break;
      default: // method not allowed
        res.status(405).json(null);
        return resolve();
    }
  });
}
