import dbConnect from 'api-lib/dbConnect';
import {
  getEventsFromGroup,
  getGroup,
  getAvailabilitiesFromGroup,
} from 'api-lib/db';
import { verifyJwt } from 'api-lib/auth';
import { NotFoundError, UnauthorizedError } from 'api-lib/util/exceptions';
import { sendNoDocumentError, sendRequestError } from 'api-lib/helper';
import {
  parseAvailabilities,
  parseEvents,
} from 'api-lib/util/calendarStrength';

import { Cookie } from 'api-lib/requests/cookie';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { groupID } = req.query;

        const { group, groupError } = await getGroup({ groupID });
        if (groupError !== null) {
          if (groupError instanceof NotFoundError) {
            console.log(groupError.message);
            sendNoDocumentError(res);
            return;
          }
          sendRequestError(res, groupError);
        }

        /* Validate authorization for private group */
        if (group.isPrivate) {
          const cookie = Cookie.New(req, res);
          const token = cookie.getPrivateGroupToken();

          if (!token || token === '') {
            throw new UnauthorizedError();
          }

          console.log('error made it here');
          verifyJwt(token, (decodedToken) => {
            if (decodedToken !== groupID) {
              throw new UnauthorizedError();
            }
          });
        }

        const { availabilities, events } = group;
        const groupAvails = getAvailabilitiesFromGroup(availabilities);
        const groupEvents = getEventsFromGroup(events);

        const value = await Promise.all([groupAvails, groupEvents]);
        const allAvailabilities = parseAvailabilities(value[0]);
        const allEvents = parseEvents(value[1]);

        res.status(200).json({
          group,
          calendarEvents: [...allAvailabilities, ...allEvents],
        });
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          return res.status(401).json();
        }

        sendRequestError(res, error);
      }

      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });

      break;
  }
}
