import { expect, it, describe, afterAll } from '@jest/globals';
import { validateGroupPassword } from 'api-lib/db/private_password';
import { Group, GroupPasswords } from 'api-lib/model';
import { NotFoundError, UnauthorizedError } from 'api-lib/util/exceptions';
import { saveGroup } from 'api-lib/db/helpers/saveGroup';
import ld from 'lodash';
import { privateGroup } from './mockdata/db_group_mock';

const savedGroupIDs = [];

const test_group = (callback) => {
  const test_group = ld.cloneDeep(privateGroup);
  saveGroup(test_group)
    .then((groupID) => {
      savedGroupIDs.push(groupID);
      callback(groupID);
    })
    .catch((err) => {
      console.log(err);
    });
};

afterAll(async () => {
  try {
    // delete saved group
    await Group.deleteMany({ _id: { $in: savedGroupIDs } });
    // delete saved password
    await GroupPasswords.deleteMany({ group: { $in: savedGroupIDs } });
  } catch (e) {
    console.warn(`Test error:\n${e}`);
  }
});

describe("Testing arg for validateGroupPassword's callback", () => {
  it('_err_ is null if password is correct', () => {
    test_group((groupID) => {
      validateGroupPassword(
        { groupID: groupID, password: privateGroup.password },
        (err) => expect(err).toBeNull()
      );
    });
  });

  it('_err_ is NotFoundError', () => {
    test_group((_) => {
      validateGroupPassword(
        { groupID: 'somerandomeid', password: privateGroup.password },
        (err) => expect(err).toBeInstanceOf(NotFoundError)
      );
    });
  });

  it('_err_ is UnauthorizedError', () => {
    test_group((groupID) => {
      validateGroupPassword({ groupID, password: 'wrongpassword' }, (err) =>
        expect(err).toBeInstanceOf(UnauthorizedError)
      );
    });
  });
});
