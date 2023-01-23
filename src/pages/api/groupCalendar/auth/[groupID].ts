import { NextApiResponse, NextApiRequest } from 'next';
import { groupAuthentication } from 'api-lib/db/group';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const groupID = parseInt(req.query.groupID as string);
  const { password } = req.body;

  if (password === '' || !password) {
    res.status(400).end();
    console.warn('missing password, check client side form validation');
    return;
  }

  const { matched, err } = await groupAuthentication(groupID, password);
  if (err) res.status(err.statusCode).end();

  if (!matched) res.status(401).end();

  // sign jwt here
}
