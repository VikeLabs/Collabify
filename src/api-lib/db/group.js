import mongoose from 'mongoose';
import { Group } from '../model';

export const createGroup = async ({ group }) => {
  // Creates group
  // If theres an error function will return true
  const model = new Group(group);
  const { error, groupID } = await model
    .save()
    .then((e) => {
      return {
        error: false,
        groupID: e._id,
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        error: true,
        groupID: null,
      };
    });

  return {
    error,
    groupID,
  };
};

export const getGroup = async ({ groupID }) => {
  // Gets the group by the group name
  // Doesn't return error because it gets handled on api side (result.length > 0)
  try {
    const group = await Group.findOne({ _id: groupID });
    return group
      ? { groupError: true, group: null }
      : { groupError: false, group };
  } catch (e) {
    return {
      groupError: true,
      group: null,
    };
  }
};

export const getManyGroups = async ({ groupIDs }) => {
  // groupIDs should be an array of ids
  let error = false;
  const groupIDsArray = groupIDs?.map((e) => mongoose.Types.ObjectId(e));
  const groups = await Group.find({ _id: { $in: groupIDsArray } });

  if (!groups) {
    error = true;
  }

  return {
    error,
    groups,
  };
};

export const getAllGroups = async () => {
  let error = false;
  const groups = await Group.find();

  if (!groups) {
    error = true;
  }

  return {
    error,
    groups,
  };
};

export const updateGroup = async ({ groupID, group }) => {
  // Updates group
  // If theres an error function will return true
  const { error } = await Group.updateOne(
    { _id: groupID },
    {
      $set: group,
    }
  )
    .then((e) => {
      console.log(e);
      return {
        error: false,
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        error: true,
      };
    });

  return {
    error,
  };
};
