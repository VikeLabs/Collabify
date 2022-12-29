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

export const getAvailabilitiesFromGroup = (groupAvailabilities) => {
  return new Promise((resolve, reject) => {
    Availability.find(
      {
        _id: { $in: groupAvailabilities },
      },
      (err, availabilities) => {
        if (err) return reject(err);
        return resolve(availabilities);
      }
    );
  });
};
