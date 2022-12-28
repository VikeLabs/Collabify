import { it, expect, describe, beforeAll, afterAll } from '@jest/globals';
import { createGroup } from '../group';
import dbConnect from '../../dbConnect.js';
import ld from 'lodash';
import { Group, GroupPasswords } from '../../model';

import { publicGroup, privateGroup } from './mockdata/db_group_mock';

let savedID = []; // test groups to be deleted
beforeAll(async () => {
  await dbConnect();
});

let privateGroup_clone;
let publicGroup_clone;
beforeEach(() => {
  privateGroup_clone = ld.cloneDeep(privateGroup);
  publicGroup_clone = ld.cloneDeep(publicGroup);
});

afterAll(async () => {
  // clean up
  await Group.deleteMany({ _id: { $in: savedID } });
  await GroupPasswords.deleteMany({ group: { $in: savedID } });
  savedID = [];
});

describe('/api-lib/db/group test suite', () => {
  describe('public group behaviours', () => {
    it('saves a public group', async () => {
      const { groupID, createGroupError } = await createGroup({
        group: publicGroup_clone,
      });
      expect(createGroupError).toBe(null);
      savedID.push(groupID);

      Group.findById(groupID, (_, doc) => {
        expect(doc.isPrivate).toBe(false);
      });
    });
  });

  describe('private group behaviours', () => {
    describe('_groups_ collection', () => {
      it('_isPrivate_', async () => {
        const { groupID, createGroupError } = await createGroup({
          group: privateGroup_clone,
        });
        expect(createGroupError).toBe(false);
        savedID.push(groupID);
        Group.findById(groupID, (_, doc) => {
          expect(doc.isPrivate).toBe(true);
        });
      });
    });

    describe('_group_passwords_ collection', () => {
      it('returns a (bool) error for _sendRequestError_', async () => {
        publicGroup_clone.isPrivate = true;

        const { groupID, createGroupError } = await createGroup({
          group: publicGroup_clone,
        });

        expect(createGroupError).toBe(true);
        expect(groupID).toBe(null);
      });

      it('deletes password from _group_ object after encryption', async () => {
        const { groupID } = await createGroup({
          group: privateGroup_clone,
        });
        savedID.push(groupID);

        expect(privateGroup_clone.password).toBeUndefined();
      });

      it('saves password if no error is thrown', async () => {
        const { groupID } = await createGroup({
          group: privateGroup_clone,
        });
        savedID.push(groupID);

        GroupPasswords.findOne({ group: groupID }, (_, matched) => {
          expect(matched.group.toString()).toBe(groupID.toString());
        });
      });
    });
  });
});
