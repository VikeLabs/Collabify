import dbConnect from '../../../api-lib/dbConnect';
import {
  getEventsFromGroup,
  getGroup,
  getAvailabilitiesFromGroup,
} from '../../../api-lib/db';
import { sendNoDocumentError, sendRequestError } from '../../../api-lib/helper';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { groupName } = req.query;
        const { groupError, group } = await getGroup({ groupName });
        const { availabilitiesError, availabilities } =
          await getAvailabilitiesFromGroup({
            groupName,
          });
        const { eventsError, events } = await getEventsFromGroup({
          groupName,
        });
        if (groupError || availabilitiesError || eventsError) {
          sendNoDocumentError(res);
        } else {
          const calendarEvents = [];
          res.status(200).json({
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
