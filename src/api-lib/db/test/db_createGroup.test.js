import { it, expect, describe } from '@jest/globals';
import { createGroup } from '../group';
import dbConnect from '../../dbConnect.js';
import ld from 'lodash';
import { Group, GroupPasswords } from '../../model';

import {
  publicGroup as _publicGroup,
  privateGroup as _privateGroup,
} from './mockdata/db_group_mock';

const run_test = () => {
  return new Promise(() => {
    dbConnect().then(() => {
      return {
        privateGroup: ld.cloneDeep(_privateGroup),
        publicGroup: ld.cloneDeep(_publicGroup),
      };
    });
  });
};

const cleanUp = async (groupID) => {
  try {
    await Group.findOneAndDelete({ _id: groupID });
    await GroupPasswords.findOneAndDelete({ group: groupID });
  } catch (e) {
    console.log(e);
  }
};

describe('/api-lib/db/group test suite', () => {
  describe('Public group', () => {
    it('Saves public group', () => {
      run_test()
        .then(({ publicGroup }) => {
          createGroup(publicGroup, (groupID, err) => {
            expect(err).toBeNull();
            return groupID;
          });
        })
        .then((groupID) => cleanUp(groupID));
    });

    describe('Private group tests', () => {
      it('Saves private group', () => {
        run_test(async ({ privateGroup }) => {
          createGroup(privateGroup, (groupID, err) => {
            expect(err).toBeFalsy();
            return groupID;
          }).then((groupID) => cleanUp(groupID));
        });
      });
      //
      it('Deletes private group password', () => {
        run_test(({ privateGroup }) => {
          createGroup(privateGroup, (groupID, _) => {
            expect(privateGroup.password).toBeUndefined();
            return groupID;
          }).then((groupID) => cleanUp(groupID));
        });
      });
      //
      it('Throws error private group password is not provided', () => {
        run_test(({ privateGroup }) => {
          delete privateGroup.password;
          createGroup(privateGroup, (groupID, err) => {
            expect(err).toBeTruthy();
            return groupID;
          }).then((groupID) => cleanUp(groupID));
        });
      });
    });
  });
  //
});
