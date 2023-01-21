import { createEvent } from 'api-lib/db';
import { sendRequestError } from 'api-lib/helper';
import { sendText } from 'api-lib/twilio';
import { startToEndStandardTime } from 'api-lib/helper/militaryToStandard';

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      try {
        const { groupID, event, names, numbers } = JSON.parse(body);
        const { err } = await createEvent({ groupID, event });
        if (err) res.status(err.statusCode).end();
        else {
          numbers.forEach((_, index) => {
            sendText(
              numbers[index],
              `Hello ${names[index]}, an EVENT has been created
              \n${startToEndStandardTime(event.time.start, event.time.end)}
              \n${event.title}
              \n${event.description}
              \n\nSee all events: https://collabify.space/${groupID}/`
            );
          });
          res.status(200).json({ ok: true });
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
