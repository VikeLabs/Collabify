import { it, expect, describe, beforeAll, afterAll } from '@jest/globals';
import { createGroup } from '../group';
import dbConnect from '../../dbConnect.js';
import ld from 'lodash';
import { Group, GroupPw } from '../../model';

import { publicGroup, privateGroup } from './mockdata/db_group_mock';

beforeAll(async () => {
  await dbConnect();
});

let privateGroup_clone;
let publicGroup_clone;
beforeEach(() => {
  privateGroup_clone = ld.cloneDeep(privateGroup);
  publicGroup_clone = ld.cloneDeep(publicGroup);
});

let savedID = []; // test groups to be deleted
afterAll(async () => {
  // clean up
  await Group.deleteMany({ _id: { $in: savedID } });
  await GroupPw.deleteMany({ group: { $in: savedID } });
  savedID = [];
});

describe('/api-lib/db/group test suite', () => {
  describe('test for `private` functionality', () => {
    it('saves a public group', async () => {
      const { error, groupID } = await createGroup({
        group: publicGroup_clone,
      });
      expect(error).toBe(false);
      savedID.push(groupID);

      // query db for id
      Group.findById(groupID, (_, doc) => {
        expect(doc.isPrivate).toBe(false);
      });
    });

    describe('saves a private group', () => {
      it('throws an error for `sendRequestError`', async () => {
        publicGroup_clone.isPrivate = true;

        const { error, groupID } = await createGroup({
          group: publicGroup_clone,
        });
        expect(error).toBe(true);
        expect(groupID).toBe(null);
      });

      it('deletes password after hashed', async () => {
        const { error, groupID } = await createGroup({
          group: privateGroup_clone,
        });
        savedID.push(groupID);

        expect(error).toBe(false);
        expect(privateGroup_clone.password).toBeUndefined();
      });

      it('`isPrivate` is true', async () => {
        const { error, groupID } = await createGroup({
          group: privateGroup_clone,
        });
        expect(error).toBe(false);
        savedID.push(groupID);

        Group.findById(groupID, (_, doc) => {
          expect(doc.isPrivate).toBe(true);
        });
      });
    });
  });
});
