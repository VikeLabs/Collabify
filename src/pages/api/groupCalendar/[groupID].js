import dbConnect from 'api-lib/dbConnect';
import {
  getEventsFromGroup,
  getGroup,
  getAvailabilitiesFromGroup,
} from 'api-lib/db';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { groupID } = req.query;
        const { groupError, group } = await getGroup({ groupID });
        const { availabilitiesError, availabilities } =
          await getAvailabilitiesFromGroup({
            groupID,
          });
        const { eventsError, events } = await getEventsFromGroup({
          groupID,
        });
        if (groupError || availabilitiesError || eventsError) {
          sendNoDocumentError(res);
        } else {
          const calendarEvents = [];
          res.status(200).json({
            ok: true,
            group,
            calendarEvents,
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
