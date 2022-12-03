import mongoose from 'mongoose';
import { Group } from 'api-lib/model';
import { GroupPasswordError } from 'api-lib/util/exceptions';

import { saveGroup } from './helpers';

/**
 * createGroup
 * @params {object} group: group Schema
 * @return {object}: { error: boolean, groupID: mongoose.ObjectId | null }
 *
 * Saves group info then handle password encryption. If it fails to
 * encrypt the password it will delete the saved group and returns an
 * error. This is due to the nature that not all group is private,
 * and in case a private group does not provide any password.
 *
 * PERF: can be optimized somehow? consult with a teamlead before optimizing.
 */
export const createGroup = async ({ group }) => {
  try {
    const groupID = await saveGroup(group);
    return { error: false, groupID };
  } catch (e) {
    console.error(e);
    // handling saveGroup promise rejection for private group with no password
    if (e instanceof GroupPasswordError) {
      Group.findOneAndDelete({ _id: e.groupID }, (err, _) => {
        console.error(`failed to save group: ${group.name}`);
        if (err) console.log(err);
      });
    }

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
