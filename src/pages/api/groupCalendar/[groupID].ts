import { NextApiRequest, NextApiResponse } from 'next';
import { JsonWebToken } from 'api-lib/auth';
import { getAvailabilities } from 'api-lib/db/availability';
import { getEvents } from 'api-lib/db/event';
import { getGroupByID } from 'api-lib/db/group';
import {
  parseAvailabilities,
  parseEvents,
} from 'api-lib/util/calendarStrength';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  if (method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    const { groupID: _groupID } = req.query;
    const groupID = parseInt(_groupID as string);

    const { group, error: groupError } = await getGroupByID(groupID);
    if (groupError) {
      res.status(groupError.statusCode).end();
      return;
    }

    /* PRIVATE GROUP VALIDATION */
    if (group.isPrivate) {
      const token = getAuthToken(req.rawHeaders);
      if (!token) {
        res.status(401).end();
        console.warn(
          `group [${groupID}] is private but no auth token is attached to the request header`
        );
        return;
      }

      const { decodedToken, error: jwtError } = JsonWebToken.verify(token);
      if (jwtError) {
        res.status(jwtError.statusCode).end();
        return;
      }

      if (decodedToken !== groupID) {
        // wrong token
        res.status(401).end();
        return;
      }
    }

    /* PARSE GROUP INFORMATION */
    const { availabilities, availabilitiesError } = await getAvailabilities(
      groupID
    );
    if (availabilitiesError) {
      res.status(availabilitiesError.statusCode).end();
      return;
    }

    const { events, eventsError } = await getEvents(groupID);
    if (eventsError) {
      res.status(eventsError.statusCode).end();
      return;
    }

    const allAvailabilities = parseAvailabilities(availabilities);
    const allEvents = parseEvents(events);

    res.status(200).json({
      group,
      calendarEvents: [...allAvailabilities, ...allEvents],
    });
  } catch (error) {
    res.status(500).end();
    console.log(error);
    return;
  }
}

const getAuthToken = (rawHeaders: string[]): string | undefined => {
  const authEntry = rawHeaders.findIndex(
    (entry) => entry.toLowerCase() === 'authorization'
  );
  if (authEntry === -1) return;

  const authString = rawHeaders[authEntry + 1];

  const [tokenType, token] = authString.split(' ');
  if (tokenType.toLowerCase() !== 'bearer') {
    console.warn(`Wrong token type - EXPECTED Bearer, GOT [${tokenType}]`);
    return;
  }

  return token;
};
