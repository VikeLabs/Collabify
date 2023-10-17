import type { NextApiRequest, NextApiResponse } from 'next';
import { getGroupsByTitle } from 'api-lib/db/group/getGroupsByTitle';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const { q } = req.query;
  if (!q) {
    res.status(400);
    res.json({ error: 'missing query string `q`' });
    return;
  }

  try {
    const groups = await getGroupsByTitle(q as string);

    res.status(200).json(groups);
  } catch (e) {
    res.status(500).end();
    console.error(e);
  }
}
