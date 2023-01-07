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
 * @param {{ group: mongoose.model.Group }} group - an instance of `Group` schema
 * @param {(groupID: string, err: InternalServerError | null) => void} callback
 * @return {{ groupID: string | null, createGroupError: InternalServerError | null }}
 */
export const createGroup = async (group, callback) => {
  try {
    // extracting password
    let pw;
    if (group.isPrivate) {
      pw = _.cloneDeep(group.password);
      delete group.password;
    }
    /* SAVE GROUP */
    const newGroup = new Group(group);
    const groupID = await newGroup.save().then((savedDoc) => {
      console.log(savedDoc);
      return savedDoc['_id'];
    });

    if (!group.isPrivate) {
      return callback(groupID, null);
    }
    /* ENCRYPT PASSWORD */
    const saltRounds = 10;
    bcrypt.hash(pw, saltRounds, async (hashErr, hash) => {
      if (hashErr) {
        const passwordErr = new GroupPasswordError({
          message: hashErr.message,
          groupID,
        });
        return callback(null, new InternalServerError(passwordErr));
      }

      // save pw
      const newPassword = new GroupPasswords({
        password: hash,
        group: groupID,
      });

      await newPassword.save().then(() => {
        return callback(groupID, null);
      });
    });
  } catch (e) {
    return callback(null, new InternalServerError(e));
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
