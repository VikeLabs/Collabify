import { validateGroupPassword } from 'api-lib/db/private_password';
import { ApiError } from 'api-lib/util/exceptions';
import { signJWT } from 'api-lib/auth';
import { Cookie } from 'api-lib/requests/cookie';

export default async function (req, res) {
  const { groupID, password } = req.query;
  if (!groupID || !password) {
    res.status(400).json({ message: 'missing group ID and/or password' });
    return;
  }

  switch (req.method) {
    case 'POST': {
      validateGroupPassword({ groupID, password }, (error) => {
        if (error !== null || error instanceof ApiError) {
          res.status(error.statusCode).json({ message: error.message });
          return;
        }

        // group validated, send back credentials
        const cookie = Cookie.New(req, res);
        const token = signJWT({ groupID });
        cookie.setPrivateGroupToken(token);

        return res.status(200).json();
      });
    }
    default: // method not allowed
      res.status(405).json(null);
      break;
  }
}
