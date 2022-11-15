import dbConnect from 'api-lib/dbConnect';
import { addEventToGroup } from 'api-lib/db';
import { sendDatabaseError, sendRequestError } from 'api-lib/helper';
import { sendText } from 'api-lib/twilio';
import { startToEndStandardTime } from 'api-lib/helper/militaryToStandard';
import { BASE_URL } from 'constants';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { groupID, event, names, numbers } = JSON.parse(body);

        const err = await addEventToGroup({
          groupID,
          event,
        });
        if (err === true) sendDatabaseError(res);
        else {
          numbers.forEach((_, index) => {
            sendText(
              numbers[index], 
              `Hello ${names[index]}, an EVENT has been created
              \n${startToEndStandardTime(event.time.start, event.time.end)}
              \n${event.title}
              \n${event.description}
              \n\nSee all events: ${BASE_URL}/${groupID}/`
              )
          })
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
