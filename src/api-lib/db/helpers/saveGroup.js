import { Group } from '../../model';
import _ from 'lodash';
import * as bcrypt from 'bcrypt';

export const saveGroup = async (group) => {
  return new Promise(async (resolve, reject) => {
    /* SAVE GROUP */
    if (!group.isPrivate) {
      const newGroup = new Group(group);
      const groupID = await newGroup
        .save()
        .then((savedDoc) => savedDoc._id)
        .catch((e) => reject(e));

      resolve({ groupID, hash: null });
    }

    /* ENCRYPT PASSWORD */
    if (group.isPrivate) {
      const pw = _.cloneDeep(group.password);
      delete group.password;
      // hash pw
      const saltRounds = 10;
      bcrypt.hash(pw, saltRounds, async (err, hash) => {
        if (err) {
          reject(`failed to hash password`);
        }

        /* SAVE GROUP */
        const newGroup = new Group(group);
        const groupID = await newGroup
          .save()
          .then((savedDoc) => savedDoc._id)
          .catch((e) => reject(e));

        resolve({ groupID, hash });
      });
    }
  });
};
