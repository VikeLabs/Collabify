import dbConnect from 'api-lib/dbConnect';
import { createGroup } from 'api-lib/db';
import { sendDatabaseError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  /* EXTRACTING GROUP INFO */
  const group = JSON.parse(body);
  // if group is private and no password is provided
  if (group.isPrivate && !group.password) {
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

    res.status(200).json({
      ok: true,
      groupID,
    });
  } catch (err) {
    sendRequestError(res, err);
  }
}
