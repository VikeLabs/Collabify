import { Group } from '@prisma/client';
import { createGroup } from 'api-lib/db/group';
import { ApiError } from 'api-lib/util/apiError';

import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const PRIVATE_GROUP_SECRET = process.env.PRIVATE_GROUP_SECRET;

interface ResponseBuffer {
  access_token?: string;
  groupID: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(async (resolve) => {
    if (req.method !== 'POST') {
      res.status(405).end();
      return;
    }

    try {
      const reqGroup: Group = req.body;
      const { group, error } = await createGroup(reqGroup);
      if (error) {
        res.status(error.statusCode).end();
        return resolve();
      }

      const buf: ResponseBuffer = { groupID: group.id };

      if (group.isPrivate) {
        const jwtOpts = {
          expiresIn: 7 * 24 * 60 * 60, // expires in 7 days
        };
        const token = jwt.sign(
          { groupToken: group.privateToken },
          PRIVATE_GROUP_SECRET,
          jwtOpts
        );
        buf.access_token = token;
      }

      res.status(201).json(buf);
      return resolve();
    } catch (err) {
      console.log(err);
      res.status(500).end();
      return resolve();
    }
  });
}
