import { GroupPasswordError } from 'api-lib/util/exceptions';
import { Group, GroupPasswords } from 'api-lib/model';
import _ from 'lodash';
import * as bcrypt from 'bcrypt';

export const saveGroup = (group) => {
  return new Promise(async (resolve, reject) => {
    // extracting password
    let pw;
    if (group.isPrivate) {
      pw = _.cloneDeep(group.password);
      delete group.password;
    }

    /* SAVE GROUP */
    const newGroup = new Group(group);
    const groupID = await newGroup
      .save()
      .then((savedDoc) => savedDoc._id)
      .catch((e) => reject(e));

    if (!group.isPrivate) {
      resolve(groupID);
      return;
    }

    /* ENCRYPT PASSWORD */
    const saltRounds = 10;
    bcrypt.hash(pw, saltRounds, async (hashErr, hash) => {
      if (hashErr) {
        const passwordErr = new GroupPasswordError({
          message: hashErr.message,
          groupID,
        });
        reject(passwordErr);
        return;
      }

      // save pw
      const newPassword = new GroupPasswords({
        password: hash,
        group: groupID,
      });
      await newPassword.save().catch((e) => {
        const passwordErr = new GroupPasswordError({
          message: e.message,
          groupID,
        });
        reject(passwordErr);
        return;
      });

      resolve(groupID);
    });
  });
};
