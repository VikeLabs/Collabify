import dbConnect from 'api-lib/dbConnect';
import { getGroup, updateGroup } from 'api-lib/db';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';
import { NotFoundError } from 'api-lib/util/exceptions';

export default async function handler(req, res) {
  const { method, body } = req;
  const { groupID } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET': {
      const { groupError, group } = await getGroup({ groupID });

      if (groupError === null) {
        return res.status(200).json({
          ok: true,
          group,
        });
      }

      if (groupError instanceof NotFoundError) {
        sendNoDocumentError(res, groupError);
      } else {
        sendRequestError(res, groupError);
      }
      break;
    }
    case 'PATCH': {
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
        console.log(error);
        sendRequestError(res, error);
      }
      break;
    }
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
