import { NextApiRequest, NextApiResponse } from 'next';
import { getGroupByID } from 'api-lib/db/group';

import { getEventsFromGroup, getAvailabilitiesFromGroup } from 'api-lib/db';
import { JsonWebToken } from 'api-lib/auth';
import { sendRequestError } from 'api-lib/helper';
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
