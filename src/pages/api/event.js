import dbConnect from 'api-lib/dbConnect';
import { addEventToGroup } from 'api-lib/db';
import { sendDatabaseError, sendRequestError } from 'api-lib/helper';
import { sendText } from 'api-lib/twilio';

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
          names, 
          numbers
        });
        if (err === true) sendDatabaseError(res);
        else {
          // TODO: Add names and numbers loop to send texts to all names and numbers
          let index = 0; 
          let startTime = 
          for (let number of numbers){
            sendText(
              number, 
              `Hello ${names[index]}, an event has been created in one of your groups\n${event.time.start}-${event.time.end}\n${event.title}\n${event.description}`
              )
              index += 1
          }
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
