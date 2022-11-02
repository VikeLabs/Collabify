import dbConnect from 'api-lib/dbConnect';
import {
  addAvailabilityToGroup,
} from 'api-lib/db';
import { sendDatabaseError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { groupID, availability } = JSON.parse(body);

        const err = await addAvailabilityToGroup({
          groupID,
          availability,
        });
        if (err === true) sendDatabaseError(res);
        // Instead of leaving response empty add ok: true
        else res.status(200).json({ok: true});
      } catch (error) {
        sendRequestError(res, error);
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
