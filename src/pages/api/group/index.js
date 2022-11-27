import dbConnect from 'api-lib/dbConnect';
import { createGroup } from 'api-lib/db';
import { sendDatabaseError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  await dbConnect();

  try {
    const group = JSON.parse(body);
    if (body.isPrivate === true) {
      // hash password here
    }

    const { error, groupID } = await createGroup({ group });
    if (error === true) sendDatabaseError(res);
    else
      res.status(200).json({
        ok: true,
        groupID,
      });
  } catch (err) {
    sendRequestError(res, err);
  }
}
