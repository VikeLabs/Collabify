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

  console.log('yup')
}
