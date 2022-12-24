import dbConnect from 'api-lib/dbConnect';
import { createGroup } from 'api-lib/db';
import { sendDatabaseError, sendRequestError } from 'api-lib/helper';

import jwt from 'jsonwebtoken';
import Cookie from 'cookies';

import { PRIVATE_GROUP_TOKEN } from 'constants';

const PRIVATE_GROUP_SECRET = process.env.PRIVATE_GROUP_SECRET;

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  /* EXTRACTING GROUP INFO */
  const group = JSON.parse(body);
  // if group is private and no password is provided
  if (group.isPrivate && (!group.password || group.password === '')) {
    res.status(400).json({
      message: 'Group is private but no password is provided',
    });
    return;
  }

  /* SAVE TO DB */
  await dbConnect();

  try {
    const { error, groupID } = await createGroup({ group });

    if (error === true) {
      sendDatabaseError(res);
      return;
    }

    if (group.isPrivate) {
      const tokenOpt = {
        expiresIn: 60 * 60 * 24 * 7, // expires in 7 days
      };
      const token = jwt.sign({ groupID }, PRIVATE_GROUP_SECRET, tokenOpt);

      const cookieOpt = {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      };
      const cookies = new Cookie(req, res);
      cookies.set(PRIVATE_GROUP_TOKEN, token, cookieOpt);
    }

    res.status(200).json({
      ok: true,
      groupID,
    });
  } catch (err) {
    sendRequestError(res, err);
  }
}
