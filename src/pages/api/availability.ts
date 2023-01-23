import { createAvailability } from 'api-lib/db';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { body } = req;
  try {
    const { groupID, availability } = JSON.parse(body);

    await createAvailability(groupID, availability);
    res.status(201).end();
  } catch (error) {
    res.status(500).end();
    console.log(error);
  }
}
