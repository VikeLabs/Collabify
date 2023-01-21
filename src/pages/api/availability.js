import { createAvailability } from 'api-lib/db';
import { sendRequestError } from 'api-lib/helper';

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      try {
        const { groupID, availability } = JSON.parse(body);

        const { err } = await createAvailability({ groupID, availability });
        if (err) res.status(err.statusCode).end();
        // Instead of leaving response empty add ok: true
        else res.status(200).json({ ok: true });
      } catch (error) {
        sendRequestError(res, error);
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
