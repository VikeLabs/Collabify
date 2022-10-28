import dbConnect from '../../api-lib/dbConnect';
import { addAvailabilityToGroup, getAvailabilitiesFromGroup } from '../../api-lib/db';
import { sendDatabaseError, sendRequestError } from '../../api-lib/helper';

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { groupName, availability } = JSON.parse(body);

        const err = await addAvailabilityToGroup({
          groupName,
          availability,
        });
        if (err === true) sendDatabaseError(res);
        else res.status(200).send();
      } catch (error) {
        sendRequestError(res, error);
      }
      break;

      case 'GET':
        try{
          const { groupName } = JSON.parse(body);
  
          const { error, availabilities } = await getAvailabilitiesFromGroup({
            groupName
          });
          if(error === true) sendDatabaseError(res);
          else res.status(200).send(availabilities);
        } catch(error) {
          sendRequestError(res, error);
        }
        break; 

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
