import dbConnect from 'api-lib/dbConnect';
import { getGroup, getManyGroups } from 'api-lib/db';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      const { groupID } = req.query;
      if (groupID?.includes(',')) {
        try {
          const groupIDs = groupID.split(',');
          const { groupError, groups } = await getManyGroups({ groupIDs });
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
      } else {
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
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
