const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.FROM_NUMBER;
const client = require('twilio')(accountSid, authToken);

export const sendText = (to: string, body: string) => {
  client.messages
    .create({
      from,
      body,
      to,
    })
    .then((message: any) =>
      console.log(`Text sent successful to SID: ${message.sid}`)
    )
    .catch((err: any) => console.error(err));
};
