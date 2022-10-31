import { Group, Event } from '../model';

export const addEventToGroup = async ({ groupName, event }) => {
  // Creates event then adds events ID to the group 'events' array
  // If theres an error function will return true
  const model = new Event(event);
  const error = await model
    .save()
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

export const deleteEventFromGroup = async ({ groupName, eventID }) => {
  const group = await Group.findOne({ name: groupName });

  let error = true;

  if (!group) {
    console.warn(`The following group was not found: ${groupName}`);
    return error;
  }

  const event = await Event.findOne({ _id: eventID });

  if (!event) {
    console.warn(`The following event id was not found: ${eventID}`);
    return error;
  }

  if (!group.events.includes(eventID)) {
    console.warn(
      `The group ${groupName} does not contain the following event id: ${eventID}`
    );
    return error;
  }

  const filter = { name: groupName };
  const update = { $pull: { events: { _id: eventID } } };

  const updatedGroup = await Group.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (updatedGroup.includes(eventID)) {
    console.warn(
      `The event id ${eventID} was not removed from group ${groupName}`
    );
    return error;
  }

  await Event.findOneAndDelete({ _id: eventID }, function (err, docs) {
    if (err) {
      console.warn(`The event id ${eventID} was not deleted`);
    } else {
      error = false;
    }
  });

  return error;
};

export const getEventsFromGroup = async ({ groupName }) => {
  const group = await Group.findOne({ name: groupName });

  let error = false;
  let events = [];

  if (!group) {
    error = true;
  } else {
    for (let event_id of group.events) {
      const event = await Event.findOne({ _id: event_id });
      if (!event) {
        console.warn(`The following id was not found: ${event_id}`);
      } else {
        events.push(event);
      }
    }
  }

  if (events.length === 0) {
    error = true;
  }

  return {
    error,
    events,
  };
};
