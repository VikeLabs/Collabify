import { expect, it, describe } from '@jest/globals';
import { validateGroupPassword } from 'api-lib/db/private_password';
import { Group, GroupPasswords } from 'api-lib/model';
import { NotFoundError, UnauthorizedError } from 'api-lib/util/exceptions';
import { saveGroup } from 'api-lib/db/helpers/saveGroup';
import ld from 'lodash';
import { privateGroup } from './mockdata/db_group_mock';
import dbConnect from 'api-lib/dbConnect';

const test_group = async (callback) => {
  await dbConnect();
  try {
    const test_group = ld.cloneDeep(privateGroup);
    const groupID = await saveGroup(test_group);
    await callback(groupID);

    // delete saved group
    await Group.deleteOne({ _id: groupID });
    // delete saved password
    await GroupPasswords.deleteOne({ group: groupID });
  } catch (e) {
    console.log(e);
  }
};

describe("Testing arg for validateGroupPassword's callback", () => {
  it('_err_ is null if password is correct', async () => {
    await test_group(async (groupID) => {
      validateGroupPassword(
        { groupID, password: privateGroup.password },
        (err) => {
          expect(err).toBeNull();
        }
      );
    });
  });

  it('_err_ is NotFoundError', async () => {
    await test_group(async (_) => {
      validateGroupPassword(
        {
          groupID: 'wrongGroupID',
          password: privateGroup.password,
        },
        (err) => {
          expect(err).toBeInstanceOf(NotFoundError);
        }
      );
    });
  });

  it('_err_ is UnauthorizedError', async () => {
    await test_group(async (groupID) => {
      validateGroupPassword(
        {
          groupID,
          password: 'wrongGroupPassword',
        },
        (err) => {
          expect(err).toBeInstanceOf(UnauthorizedError);
        }
      );
    });
  });
});
