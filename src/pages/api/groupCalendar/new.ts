import { Group } from '@prisma/client';
import { JsonWebToken as jwt } from 'api-lib/auth';
import { createGroup } from 'api-lib/db/group';

import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseBuffer {
  access_token?: string;
  groupID: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  console.log('Received')

  try {
    const reqGroup: Group = req.body;
    console.log('here')
    const { group, error } = await createGroup(reqGroup);
    if (error) {
      res.status(error.statusCode).end();
      return;
    }

    const buf: ResponseBuffer = { groupID: group.id };

    if (reqGroup.isPrivate) {
      buf.access_token = jwt.signPrivateGroupToken(group.privateToken);
    }

    res.status(201).json(buf);
    return;
  } catch (err) {
    res.status(500).end();
    console.log(err);
    return;
  }
}
