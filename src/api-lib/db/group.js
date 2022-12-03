import mongoose from 'mongoose';
import { Group, GroupPw } from '../model';

import { saveGroup } from './helpers';

/**
 * createGroup
 * @params {object} group: group Schema
 * @return {object} : {error: boolean, groupID: primitive.ObjecID}
 */
export const createGroup = async ({ group }) => {
  try {
    const { groupID, hash } = await saveGroup(group);
    // TODO: save password.
    return { error: false, groupID };
  } catch (e) {
    console.log(e);
    // TODO: custom error class for deleting group if password is failed to save
    return { error: true, groupID: null };
  }
};

export const getGroup = async ({ groupID }) => {
  // Gets the group by the group name
  // Doesn't return error because it gets handled on api side (result.length > 0)
  let error = false;
  const group = await Group.findOne({ _id: groupID });

  if (!group) {
    error = true;
  }

  return {
    error,
    group,
  };
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
