import { Group, Availability } from '../model';
import mongoose from 'mongoose';

export const addAvailabilityToGroup = async ({ groupID, availability }) => {
  // Creates availability then adds availabilities ID to the group 'availabilities' array
  // If theres an error function will return true
  const model = new Availability(availability);
  const error = await model
    .save()
    .then((savedDoc) => {
      Group.findOneAndUpdate(
        { _id: groupID },
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

export const getAvailabilitiesFromGroup = async ({ groupID }) => {
  const group = await Group.findOne({ _id: groupID });

  let error = false;
  let availabilities = [];

  if (!group) {
    error = true;
  } else {
    for (let availabilityID of group.availabilities) {
      const availability = await Availability.findOne({ _id: availabilityID });
      if (!availability) {
        console.warn(`The following id was not found: ${availabilityID}`);
      } else {
        availabilities.push(availability);
      }
    }
  }

  if (availabilities.length === 0) {
    error = true;
  }

  return {
    error,
    availabilities,
  };
};
