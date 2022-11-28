import mongoose from 'mongoose';
import { Group, GroupPw } from '../model';
import * as bcrypt from 'bcrypt';
import ld from 'lodash';

/**
 * createGroup
 * @params {object} group: group Schema
 * @return {object} : {error: boolean, groupID: primitive.ObjecID}
 */
export const createGroup = async ({ group }) => {
  const pw = ld.cloneDeep(group.password);
  delete group.password;

  /* CREATE GROUP */
  const model = new Group(group);
  const { error, groupID } = await model
    .save()
    .then((e) => {
      if (group.isPrivate) {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            // TODO: custom logging
            throw new Error(err);
          }

          bcrypt.hash(pw, salt, async (err, hashedPW) => {
            if (err) {
              // TODO: custom logging
              throw new Error(err);
            }

            const passwordDoc = new GroupPw({
              password: hashedPW,
              groupId: e._id,
            });
            await passwordDoc.save().catch((e) => {
              throw new Error(`Failed to save password: ${e}`);
            });
          });
        });
      }

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

  /* HASH PW (if needed) */
  if (group.isPrivate) {
  }

  return {
    error,
    groupID,
  };
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
