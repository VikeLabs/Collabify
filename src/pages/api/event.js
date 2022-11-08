import dbConnect from 'api-lib/dbConnect';
import { addEventToGroup } from 'api-lib/db';
import { sendDatabaseError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { groupID, event, names, numbers } = JSON.parse(body);

        const err = await addEventToGroup({
          groupID,
          event,
        });
        if (err === true) sendDatabaseError(res);
        else {
          // TODO: Add names and numbers loop to send texts to all names and numbers
          // that marked availability under event
          res.status(200).json({ ok: true });
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
