import { NextApiRequest, NextApiResponse } from 'next';
import { Credentials } from 'blog/api/types';
import { createAnAdmin } from 'blog/api/services/admin.services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const newUser = req.body as Credentials;
    const err = await createAnAdmin(newUser);
    if (err) {
      res.status(err.statusCode).end();
      return;
    }

    res.status(201).end();
  } catch (e) {
    res.status(500).end();
    console.log(e);
  }
}
