import { NextApiRequest, NextApiResponse } from 'next';
import { Event } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { sendText } from 'api-lib/twilio';
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
    const groupID = parseInt(req.query.groupID as string);

    const { names, numbers } = JSON.parse(body);
    const event: Event = body.event;
    const newEvent = { ...event, groupID };

    await prisma.event.create({ data: newEvent });

    res.status(201).end();

    // TODO: modify the `startToEndStandardTime` function
    numbers.forEach((_, index: number) => {
      sendText(
        numbers[index],
        `Hello ${names[index]}, an EVENT has been created
              \n${startToEndStandardTime(event.startTime, event.endTime)}
              \n${event.title}
              \n${event.description}
              \n\nSee all events: https://collabify.space/${groupID}/`
      );
    });
  } catch (error) {
    res.status(500).end();
    console.log(error);
  }
}
