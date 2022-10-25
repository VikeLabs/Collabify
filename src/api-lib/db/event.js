import { Group, Event } from '../model';

export const addEventToGroup = async ({ groupName, event }) => {
  // Creates event then adds events ID to the group 'events' array
  // If theres an error function will return true
  const model = new Event(event);
  const error = await model.save()
    .then((savedDoc) => {
      Group.findOneAndUpdate(
        { name: groupName },
        { $push: { events: savedDoc._id } },
        { new: true },
        (err) => {
          if (err) {
            console.error(err);
            return true;
          }
        }
      );
      return false;
    })
    .catch((err) => {
      console.error(err);
      return true;
    });

  return error;
};
