import { expect, it, describe } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import handler from 'pages/api/groupCalendar/auth/[groupID]';
import { privateGroup } from 'api-lib/db/test/mockdata/db_group_mock';
import ld from 'lodash';
import { GroupPasswords, Group } from 'api-lib/model';
import dbConnect from 'api-lib/dbConnect';

const TEST_URL = '/api/groupCalendar/auth';

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

const mock_data = [
  {
    input: {
      groupID: (s) => s,
      password: privateGroup.password,
    },
    expectedStatus: 200,
  },
  {
    input: {
      groupID: (s) => s,
      password: 'wrongPassword',
    },
    expectedStatus: 401,
  },
  {
    input: {
      groupID: (s) => s + 'wrongID',
      password: privateGroup.password,
    },
    expectedStatus: 400,
  },
];

describe('/api/groupCalendar/auth/:groupID', () => {
  it('responses with proper status code', () => {
    mock_data.forEach(async (data) => {
      await test_group(async (id) => {
        const groupID = data.input.groupID(id);

        const { req, res } = createMocks({
          method: 'POST',
          url: TEST_URL + `/${groupID}`,
          body: JSON.stringify({ password: data.input.password }),
        });

        await handler(req, res);

        expect(res._getStatusCode).toBe(data.input.expectedStatus);
      });
    });
  });
});
