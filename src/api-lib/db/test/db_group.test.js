import { it, expect, describe, beforeAll, afterAll } from '@jest/globals';
import { createGroup } from '../group';
import dbConnect from '../../dbConnect.js';
import { Group } from '../../model';

import { publicGroup, privateGroup } from './mockdata/db_group_mock';

beforeAll(async () => {
  await dbConnect();
});

const savedID = []; // test groups to be deleted
afterAll(async () => {
  // clean up
  await Group.deleteMany({ _id: { $in: savedID } });
});

describe('/api-lib/db/group test suite', () => {
  describe('test for `private` functionality', () => {
    it('saves a public group', async () => {
      const { _, groupID } = await createGroup({ group: publicGroup });
      savedID.push(groupID);

      // query db for id
      const savedDoc = await Group.findById(groupID);
      expect(savedDoc.isPrivate).toBe(false);
    });

    describe('saves a private group', () => {
      it('`isPrivate` is true', async () => {
        const { _, groupID } = await createGroup({ group: privateGroup });
        savedID.push(groupID);

        // query db by id
        const savedDoc = await Group.findById(groupID);
        expect(savedDoc.isPrivate).toBe(true);
      });

      it('hashed password', async () => {
        const { _, groupID } = await createGroup({ group: privateGroup });
        savedID.push(groupID);

        // query db by id
        const savedDoc = await Group.findById(groupID);
        expect(savedDoc.password !== privateGroup.password).toBeTruthy();
        console.log(`Password raw:\n${privateGroup.password}`);
        console.log(`Password hashed:\n${savedDoc.password}`);
      });
    });
  });
});
