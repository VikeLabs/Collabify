import dbConnect from '../dbConnect.js';
import { createGroup } from '../db/group';
import { Group } from '../model';

const testName = 'test1';
const mockGroup = {
  group: {
    name: testName,
    description: 'test description',
    icon: '_test icon',
    background: 'test background',
    events: [123, 456],
    availabilities: [123, 456],
  },
};

beforeAll(async () => {
  await dbConnect();
});

afterEach(async () => {
  // Nuke the mock group
  Group.deleteOne({ name: testName });
});

describe('db/group', () => {
  it('prevents duplications', async () => {
    const _ = await createGroup(mockGroup);

    const hasErr = await createGroup(mockGroup);
    expect(hasErr).toEqual(true);
  }, 20000);
});
