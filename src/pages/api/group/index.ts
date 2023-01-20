import { createGroup } from 'api-lib/db/group';
import { sendDatabaseError, sendRequestError } from 'api-lib/helper';

import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const PRIVATE_GROUP_SECRET = process.env.PRIVATE_GROUP_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(async (resolve) => {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
      return resolve();
    }

    try {
      /* EXTRACTING GROUP INFO */
      const group = req.body;

      // if group is private and no password is provided
      if (group.isPrivate && (!group.password || group.password === '')) {
        res.status(400).json({
          message: 'Group is private but no password is provided',
        });
        return resolve();
      }

      createGroup(group, (groupID, err) => {
        if (err) {
          sendDatabaseError(res);
          return resolve();
        }

        const responseBuffer = {};

        responseBuffer['groupID'] = groupID;
        /* Signing a jwt token and send it back */
        if (group.isPrivate) {
          const tokenOpt = {
            expiresIn: 60 * 60 * 24 * 7, // expires in 7 days
          };
          const token = jwt.sign({ groupID }, PRIVATE_GROUP_SECRET, tokenOpt);
          responseBuffer['access_token'] = token;
        }
        res.status(201).json(responseBuffer);
        return resolve();
      });
    } catch (err) {
      sendRequestError(res, err);
      return resolve();
    }
  });
}
