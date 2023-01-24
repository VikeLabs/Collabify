import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllGroups } from 'api-lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    const allGroups = await getAllGroups();
    res.status(200).json(allGroups);
    return;
  } catch (error) {
    res.status(500).end();
    console.log(error);
    return;
  }
}
