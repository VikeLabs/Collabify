import dbConnect from '../dbConnect.js';
import { createGroup } from '../db/group';
import { Group } from '../model';

const test_name = '_test1';
const mockGroup = {
  group: {
    name: test_name,
    description: '_test description',
    icon: '_test icon',
    background: '_test background',
    events: [123, 456],
    availabilities: [123, 456],
  },
};

beforeAll(async () => {
  await dbConnect();
});

afterEach(async () => {
  // Nuke the mock group
  Group.deleteOne({ name: test_name });
});

describe('db/group', () => {
  it('prevents duplications', async () => {
    const _ = await createGroup(mockGroup);

    const hasErr = await createGroup(mockGroup);
    expect(hasErr).toEqual(true);
  }, 20000);
});
