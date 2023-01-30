import { NextApiRequest, NextApiResponse } from 'next';
import { Event, Prisma } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { sendText } from 'api-lib/twilio';
import { createEvent, type NewEvent } from 'api-lib/db/event/createEvent';
import { startToEndStandardTime } from 'api-lib/helper/militaryToStandard';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { body } = req;
    console.log(body);
    const groupID = parseInt(req.query.groupID as string);
    const event: NewEvent = body;

    await createEvent(body as NewEvent, groupID);

    res.status(201).end();

    // query db to get phone numbers to send texts
    const filter: Prisma.AvailabilityFindManyArgs = {
      where: { groupID },
      select: {
        userName: true,
        userNumber: true,
      },
    };
    const users = await prisma.availability.findMany(filter);

    users.forEach(({ userNumber, userName }) => {
      const msg = `Hello ${userName}, an EVENT has been created
${startToEndStandardTime(event.time.start, event.time.end)}
${event.title}
${event.description}
\nSee all events: https://collabify.space/${groupID}/`;
      sendText(userNumber, msg);
    });
  } catch (error) {
    res.status(500).end();
    console.log(error);
  }
}
