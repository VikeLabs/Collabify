import mongoose from 'mongoose';
import { Group } from 'api-lib/model';
import { GroupPasswordError, NotFoundError } from 'api-lib/util/exceptions';

import { saveGroup } from './helpers';

/**
 * createGroup
 * @params {object} group: group Schema
 * @return {object}: { groupID: monoose.Types.objectID | null, createGroupError: Error | null }
 *
 * Saves group info then handle password encryption. If it fails to
 * encrypt the password it will delete the saved group and returns an
 * error. This is due to the nature that not all group is private,
 * and in case a private group does not provide any password.
 */
export const createGroup = async ({ group }) => {
  try {
    const groupID = await saveGroup(group);
    return { groupID, createGroupError: null };
  } catch (e) {
    // handling saveGroup promise rejection for private group with no password
    if (e instanceof GroupPasswordError) {
      Group.findOneAndDelete({ _id: e.groupID }, (err, _) => {
        console.error(`failed to save group: ${group.name}`);
        if (err) {
          console.warn(`Requires manual deletion of group: ${group}`);
        }
      });
    }

    return { groupID: null, createGroupError: new Error(e) };
  }
};

export const getGroup = async ({ groupID }) => {
  // Gets the group by the group name
  // Doesn't return error because it gets handled on api side (result.length > 0)
  try {
    const group = await Group.findById(groupID);
    return group
      ? { group, groupError: null }
      : {
          group: null,
          groupError: new NotFoundError(`Group not found: ${groupID}`),
        };
  } catch (e) {
    return {
      group: null,
      groupError: new Error(e),
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
