import { Group, Event } from '../model';

export const addEventToGroup = async ({ groupID, event }) => {
  // Creates event then adds events ID to the group 'events' array
  // If theres an error function will return true
  const model = new Event(event);
  const error = await model
    .save()
    .then((savedDoc) => {
      Group.findOneAndUpdate(
        { _id: groupID },
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

export const deleteEventFromGroup = async ({ groupID, eventID }) => {
  const group = await Group.findOne({ _id: groupID });

  let error = true;

  if (!group) {
    console.warn(`The following group was not found: ${groupID}`);
    return error;
  }

  const event = await Event.findOne({ _id: eventID });

  if (!event) {
    console.warn(`The following event id was not found: ${eventID}`);
    return error;
  }

  if (!group.events.includes(eventID)) {
    console.warn(
      `The group ${groupID} does not contain the following event id: ${eventID}`
    );
    return error;
  }

  const filter = { _id: groupID };
  const update = { $pull: { events: { _id: eventID } } };

  const updatedGroup = await Group.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (updatedGroup.includes(eventID)) {
    console.warn(
      `The event id ${eventID} was not removed from group ${groupID}`
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

export const getEventsFromGroup = async ({ groupID }) => {
  const group = await Group.findOne({ _id: groupID });

  let error = false;
  let events = [];

  if (!group) {
    error = true;
  } else {
    for (let eventID of group.events) {
      const event = await Event.findOne({ _id: eventID });
      if (!event) {
        console.warn(`The following id was not found: ${eventID}`);
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
