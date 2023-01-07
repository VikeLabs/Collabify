import { it, expect, describe } from '@jest/globals';
import { createGroup } from '../group';
import dbConnect from '../../dbConnect.js';
import ld from 'lodash';
import { Group, GroupPasswords } from '../../model';

import {
  publicGroup as _publicGroup,
  privateGroup as _privateGroup,
} from './mockdata/db_group_mock';

const run = async (callback) => {
  try {
    await dbConnect();

    const privateGroup = ld.cloneDeep(_privateGroup);
    const publicGroup = ld.cloneDeep(_publicGroup);

    const groupID = await callback({ privateGroup, publicGroup });

    await Group.findOneAndDelete({ _id: groupID });
    await GroupPasswords.findOneAndDelete({ group: groupID });
  } catch (e) {
    console.log(e);
  }
};

describe('/api-lib/db/group test suite', () => {
  describe('Public group', () => {
    it('Saves public group', async () => {
      await run(async ({ publicGroup }) => {
        const { groupID, createGroupError } = createGroup(publicGroup);
        expect(createGroupError).toBeFalsy();

        return groupID;
      });
    });
    //
    describe('Private group tests', () => {
      it('Saves private group', async () => {
        await run(async ({ privateGroup }) => {
          const { groupID, createGroupError } = createGroup(privateGroup);
          expect(createGroupError).toBeFalsy();

          return groupID;
        });
      });
      //
      it('Deletes private group password', async () => {
        await run(async ({ privateGroup }) => {
          const { groupID } = createGroup(privateGroup);
          expect(privateGroup.password).toBeUndefined();

          return groupID;
        });
      });
      //
      it('Throws error private group password is not provided', async () => {
        await run(async ({ privateGroup }) => {
          delete privateGroup.password;
          const { groupID, createGroupError } = createGroup(privateGroup);
          expect(createGroupError).toBeTruthy();

          return groupID;
        });
      });
    });
  });
  //
});
