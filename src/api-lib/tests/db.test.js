import { dbConnect } from '../dbConnect.js';
import { createGroup } from '../db/group';

// dotenv.config();

const mockGroup = {
  group: {
    name: '_test name',
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

describe('db/group', () => {
  it('creates a group', async () => {
    const hasErr = await createGroup(mockGroup);
    expect(hasErr).toEqual(false);
  }, 20000);
});
