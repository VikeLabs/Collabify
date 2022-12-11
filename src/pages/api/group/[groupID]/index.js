import dbConnect from 'api-lib/dbConnect';
import { getGroup } from 'api-lib/db';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  await dbConnect();

  const { groupID } = req.query;
  try {
    const { groupError, group } = await getGroup({ groupID });
    if (groupError) {
      sendNoDocumentError(res);
    } else {
      res.status(200).json({
        ok: true,
        group,
      });
    }
  } catch (error) {
    sendRequestError(res, error);
  }
}
