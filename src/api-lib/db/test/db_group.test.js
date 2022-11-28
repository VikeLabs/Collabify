import { it, expect, describe, beforeAll, afterAll } from '@jest/globals';
import { createGroup } from '../group';
import dbConnect from '../../dbConnect.js';
import ld from 'lodash';
import { Group, GroupPw } from '../../model';

import { publicGroup, privateGroup } from './mockdata/db_group_mock';
import mongoose, { mongo } from 'mongoose';

beforeAll(async () => {
  await dbConnect();
});

let privateGroup_clone;
beforeEach(() => {
  privateGroup_clone = ld.cloneDeep(privateGroup);
});

const savedID = []; // test groups to be deleted
const savedPw = [];
afterAll(async () => {
  // clean up
  await Group.deleteMany({ _id: { $in: savedID } });
  await GroupPw.deleteMany({ _id: { $in: savedPw } });
});

describe('/api-lib/db/group test suite', () => {
  describe('test for `private` functionality', () => {
    it('saves a public group', async () => {
      const { error, groupID } = await createGroup({ group: publicGroup });
      expect(error).toBe(false);
      savedID.push(groupID);

      // query db for id
      const savedDoc = await Group.findById(groupID);
      expect(savedDoc.isPrivate).toBe(false);
    });

    describe('saves a private group', () => {
      it('`isPrivate` is true', async () => {
        const { error, groupID } = await createGroup({
          group: privateGroup_clone,
        });
        expect(error).toBe(false);
        savedID.push(groupID);
      });
    });
  });
});
