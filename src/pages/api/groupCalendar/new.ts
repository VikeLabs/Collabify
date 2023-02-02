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
console.log('here')

    res.status(201).json('poo');
    return;
  } catch (err) {
    res.status(500).end();
    console.log(err);
    return;
  }
}
