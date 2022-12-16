import dbConnect from 'api-lib/dbConnect';
<<<<<<< HEAD
import { getGroup } from 'api-lib/db';
import { UnauthorizedError } from 'api-lib/util/exceptions';
import {
  sendNoDocumentError,
  sendRequestError,
  sendUnauth,
} from 'api-lib/helper';
import jwt from 'jsonwebtoken';

const SECRET = process.env.PRIVATE_GROUP_SECRET;
if (SECRET == '') {
  throw new Error('cannot access `PRIVATE_GROUP_SECRET` field in .env');
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  await dbConnect();

  const { groupID } = req.query;
  try {
    const { groupError, group } = await getGroup({ groupID });

    if (groupError) {
      sendNoDocumentError(res);
      return;
    }

    if (group.isPrivate) {
      const token = req.cookies.token;
      if (!token) {
        throw new UnauthorizedError(
          'group is private but no token is provided'
        );
      }
      await verifyToken(token); // will throw an error if jwt is invalid
    }

    res.status(200).json({
      ok: true,
      group,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      sendUnauth(res, error);
      return;
    }

    sendRequestError(res, error);
=======
import { getGroup, updateGroup } from 'api-lib/db';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method, body } = req;
  const { groupID } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
        try {
            const { groupError, group } = await getGroup({ groupID });
            if (groupError) {
                sendNoDocumentError(res);
            } else {
            res.status(200).json({
                ok: true,
                group,
            });
            }
        } catch (error) {
            sendRequestError(res, error);
        }
        break;
    case 'PATCH':
        const group = JSON.parse(body);
        try {
            const { groupError } = await updateGroup({ groupID, group });
            if (groupError) {
                sendNoDocumentError(res);
            } else {
            res.status(200).json({
                ok: true,
                groupID,
            });
            }
        } catch (error) {
            sendRequestError(res, error);
        }
        break;
    default:
        res.status(405).json({ message: 'Method Not Allowed' });
        break;
>>>>>>> private-group-ui
  }
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === '' || !token) {
      return reject(
        new UnauthorizedError(
          'group is private but no token is attached to the header.'
        )
      );
    }

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return reject(new UnauthorizedError(`invalid token: ${err}`));
      }

      return resolve(decoded);
    });
  });
};
