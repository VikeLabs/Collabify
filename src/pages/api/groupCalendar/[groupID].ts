import { NextApiRequest, NextApiResponse } from 'next';
import { JsonWebToken } from 'api-lib/auth';
import { getEvents, getAvailabilities } from 'api-lib/db/availability';
import { getGroupByID } from 'api-lib/db/group';
import {
  parseAvailabilities,
  parseEvents,
} from 'api-lib/util/calendarStrength';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(async (resolve) => {
    const { method } = req;

    switch (method) {
      case 'GET':
        try {
          const { groupID } = req.query;

          const { group, error: groupError } = await getGroupByID(
            parseInt(groupID as string)
          );

          if (groupError) {
            res.status(groupError.statusCode).end();
            return resolve();
          }

          /* Validate authorization for private group */
          if (group.isPrivate) {
            const token = getAuthToken(req.rawHeaders);
            if (!token) {
              console.warn(`Invalid token: ${token}`);
              res.status(401).end();
              return resolve();
            }

            const { decodedToken, error: jwtError } =
              JsonWebToken.verify(token);
            if (jwtError) {
              res.status(jwtError.statusCode).end();
              return resolve();
            }

            if (decodedToken !== groupID) {
              // wrong token
              res.status(401).end();
              return resolve();
            }
          }

          const { availabilities, events } = group;
          const { groupAvails = availabilities, availabilitiesError } =
            await getAvailabilities(availabilities);
          if (availabilitiesError !== null) {
            if (availabilitiesError instanceof NotFoundError) {
              sendNoDocumentError(res);
              return resolve();
            }
            sendRequestError(res, availabilitiesError);
          }
          const { groupEvents = events, eventsError } = await getEvents(events);
          if (eventsError !== null) {
            if (eventsError instanceof NotFoundError) {
              sendNoDocumentError(res);
              return resolve();
            }
            sendRequestError(res, eventsError);
          }

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
const getAuthToken = (rawHeaders: string[]): string | null => {
  const authEntry = rawHeaders.findIndex(
    (entry) => entry.toLowerCase() === 'authorization'
  );
  if (authEntry === -1) return null;

  const authString = rawHeaders[authEntry + 1];

  const [tokenType, token] = authString.split(' ');
  if (tokenType.toLowerCase() !== 'bearer') return null;

  return token;
};
