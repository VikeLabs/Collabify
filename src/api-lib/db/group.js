import mongoose from 'mongoose';
import { Group, GroupPasswords } from 'api-lib/model';
import {
  GroupPasswordError,
  NotFoundError,
  InternalServerError,
} from 'api-lib/util/exceptions';
import _ from 'lodash';
import bcrypt from 'bcrypt';

/**
 * createGroup
 * @param {{ group: mongoose.model.Group }} group - an instance of `Group` schema
 * @param {(groupID: string, err: InternalServerError | null) => void} callback
 */
export const createGroup = (group, callback) => {
  /* Extracting password */
  let pw;
  if (group.isPrivate) {
    pw = _.cloneDeep(group.password);
    delete group.password;
  }

  /* Save group */
  const newGroup = new Group(group).save();
  const groupID = newGroup['_id'];

  if (!group.isPrivate) {
    return callback(groupID, null);
  }

  /* Encrypt and save password */
  const saltRounds = 10;
  bcrypt
    .hash(pw, saltRounds)
    .then((hash) => {
      const newPassword = new GroupPasswords({
        password: hash,
        group: groupID,
      });

      newPassword.save().then(() => {
        callback(groupID, null);
      });
    })
    .catch((hashErr) => {
      const passwordErr = new GroupPasswordError({
        message: hashErr.message,
        groupID,
      });
      console.log(hashErr);
      // callback('', new InternalServerError(passwordErr));
      return;
    });
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
