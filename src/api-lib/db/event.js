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


export const getEventsFromGroup = async ({ groupName }) => {

  const group = await Group.findOne({name: groupName});

  let error = false;
  let events = [];

  if (!group) {
    error = true; 
  }else {
    for (let event_id of group.events){
      const event = await Event.findOne({_id: event_id});
      if (!event) {
        console.warn(`The following id was not found: ${event_id}`);
      }else{
        events.push(event)
      }
    }
  }

  if (events.length === 0){
    error = true;
  }

  return {
    error, 
    events
  }

}
