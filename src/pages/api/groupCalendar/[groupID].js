import dbConnect from 'api-lib/dbConnect';
import {
  getEventsFromGroup,
  getGroup,
  getAvailabilitiesFromGroup,
} from 'api-lib/db';
import { verifyJwt } from 'api-lib/auth';
import { UnauthorizedError } from 'api-lib/util/exceptions';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';
import {
  parseAvailabilities,
  parseEvents,
} from 'api-lib/util/calendarStrength';

import Cookie from 'cookies';
import { PRIVATE_GROUP_TOKEN } from 'constants';
import { groupEnd } from 'console';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { groupID } = req.query;
        const { groupError, group } = await getGroup({ groupID });

        /* TODO: implement this
        // validate authorization for private group
        if (group.isPrivate !== null) {
          const cookie = new Cookie(req, res);
          const token = cookie.get(PRIVATE_GROUP_TOKEN);
          const decoded = await verifyJwt(token);
          if (decoded.groupID !== groupID) {
            throw new UnauthorizedError();
          }
        }
      */

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
          const allAvailabilities = parseAvailabilities(availabilities);
          const allEvents = parseEvents(events);

          res.status(200).json({
            ok: true,
            group,
            calendarEvents: [...allAvailabilities, ...allEvents],
          });
        }
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          return res.status(401).json({ message: error.message });
        }

        sendRequestError(res, error);
      }

      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });

      break;
  }
}
