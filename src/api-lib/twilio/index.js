const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.FROM_NUMBER;
const client = require('twilio')(accountSid, authToken);

export const sendText = (to, body) => {
  client.messages
    .create({
      from: fromNumber,
      body,
      to,
    })
    .then((message) => console.log(`Text sent successful to SID: ${message.sid}`))
    .catch((err) => console.error(err));
};
