import dbConnect from 'api-lib/dbConnect';
import { getGroup, updateGroup } from 'api-lib/db';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method, body } = req;
  const { groupID } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
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
        break;
    case 'PATCH':
        const group = JSON.parse(body);
        try {
            const { groupError } = await updateGroup({ groupID, group });
            if (groupError) {
                sendNoDocumentError(res);
            } else {
            res.status(200).json({
                ok: true,
                groupID,
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
