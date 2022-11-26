import dbConnect from 'api-lib/dbConnect';
import { getAllGroups } from 'api-lib/db';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
        try {
            const { groupError, groups } = await getAllGroups();
            if (groupError) {
                sendNoDocumentError(res);
            } else {
            res.status(200).json({
                ok: true,
                groups,
            });
            }
        } catch (error) {
            sendRequestError(res, error);
        }
        break;
    default:
        res.status(405).json({ message: 'Method Not Allowed' });
        break;
  }
}
