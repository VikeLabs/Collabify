import { NextApiRequest, NextApiResponse } from 'next';
import { JsonWebToken } from 'api-lib/auth';
import { getEvents } from 'api-lib/db/event';
import { getGroupByID, updateGroup } from 'api-lib/db/group';
import { getAvailabilities } from 'api-lib/db/availability';
import { Group } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { method } = req;
    const { groupID: _groupID } = req.query;
    const groupID = parseInt(_groupID as string);

    /* GET GROUP */
    const {
      group,
      error: groupError,
      token: privateGrToken,
    } = await getGroupByID(groupID);

    if (groupError) {
      res.status(groupError.statusCode).end();
      return;
    }

    /* PRIVATE GROUP AUTH */
    if (group.isPrivate) {
      const authToken = getAuthToken(req.rawHeaders);
      if (!authToken) {
        res.status(401).end(); // no token provided in header.
        console.warn(
          `group [${groupID}] is private but no auth token is attached to the request header`
        );
        return;
      }

      const { groupToken, err } = JsonWebToken.getPrivateGroupToken(authToken);
      if (err) {
        res.status(err.statusCode).end(); // token invalid (ie, expired, tampered, etc..)
        return;
      }

      if (groupToken !== privateGrToken) {
        res.status(401).end(); // wrong token
        return;
      }
    }

    /* METHODS HANDLER */
    switch (method) {
      case 'GET': {
        // Get group information
        const allAvailabilities = await getAvailabilities(groupID);
        const allEvents = await getEvents(groupID);

        res.status(200).json({
          group,
          calendarEvents: [...allAvailabilities, ...allEvents],
        });
        return;
      }

      case 'PATCH': {
        const updatedGroup: Group = req.body;
        const data = { ...group, ...updatedGroup }; // overriding existing group

        const err = await updateGroup(data, groupID);
        if (err) {
          res.status(err.statusCode);
        }

        res.status(200).end();
      }

      default:
        res.status(405).end();
        return;
    }
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
