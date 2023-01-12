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

export default function handler(req, res) {
  return new Promise(async (resolve) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case 'GET':
        try {
          const { groupID } = req.query;

          const { group, groupError } = await getGroup({ groupID });
          if (groupError !== null) {
            if (groupError instanceof NotFoundError) {
              sendNoDocumentError(res);
              return resolve();
            }
            sendRequestError(res, groupError);
          }

          /* Validate authorization for private group */
          if (group.isPrivate) {
            const token = getAuthToken(req.rawHeaders);
            if (!token) {
              res.status(401).json({ message: 'Invalid auth token.' });
              return resolve();
            }

            verifyJwt(token, (decodedToken) => {
              if (decodedToken.groupID !== groupID) {
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

          console.log(error);

          sendRequestError(res, error);

          return resolve();
        }

        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
        return resolve();
    }
  });
}

/**
 * @param {string[]} rawHeaders - an array of header entries
 * @return {string} [token]
 */
const getAuthToken = (rawHeaders) => {
  const authEntry = rawHeaders.findIndex((entry) => entry === 'Authorization');
  if (authEntry === -1) return null;

  const authString = rawHeaders[authEntry + 1];
  const [tokenType, token] = authString.split(' ');

  if (tokenType !== 'Bearer') return null;

  return token;
};
