import prisma from 'api-lib/prisma';
import bcrypt from 'bcrypt';
import { NextApiResponse, NextApiRequest } from 'next';
import { JsonWebToken } from 'api-lib/auth';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { password } = req.body;

  if (password === '' || !password) {
    res.status(400).end();
    console.warn('missing password, check client side form validation');
    return;
  }

  try {
    const id = parseInt(req.query.groupID as string);
    const group = await prisma.group.findUnique({ where: { id } });
    const { password: hashed, privateToken } = group;
    const matched = await bcrypt.compare(password, hashed);

    if (!matched) {
      res.status(401).end();
      return;
    }

    const access_token = JsonWebToken.signPrivateGroupToken(privateToken);
    res.status(200).json({ access_token });
    return;
  } catch (e) {
    res.status(500).end();
    console.log(e);
    return;
  }
}
