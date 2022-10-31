import { Group, Availability } from '../model';
import mongoose from 'mongoose';

export const addAvailabilityToGroup = async ({ groupName, availability }) => {
  // Creates availability then adds availabilities ID to the group 'availabilities' array
  // If theres an error function will return true
  const model = new Availability(availability);
  const error = await model.save()
    .then((savedDoc) => {
      Group.findOneAndUpdate(
        { name: groupName },
        { $push: { availabilities: savedDoc._id } },
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


export const getAvailabilitiesFromGroup = async ({groupName}) => {

  const group = await Group.findOne({name: groupName});
  
  let error = false;
  let availabilities = [];

  if (!group) {
    error = true; 
  }else {
    for (let availability_id of group.availabilities){
      const availability = await Availability.findOne({_id: availability_id});
      if (!availability) {
        console.warn(`The following id was not found: ${availability_id}`);
      }else{
        availabilities.push(availability)
      }
    }
  }
  
  if (availabilities.length === 0){
    error = true;
  }

  return {
    error, 
    availabilities
  }

}
