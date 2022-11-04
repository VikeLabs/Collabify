import { getTimeInterval } from '../getTimeInterval';
import ld from 'lodash';

const testData = [
  {
    input: [1000, 1200],
    expected: [1000, 1030, 1100, 1130, 1200],
  },
  {
    input: [900, 1330],
    expected: [900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330],
  },
  {
    input: [900, 1330],
    expected: [900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330],
  },
  {
    input: [1300, 1300],
    expected: [],
  },
  {
    input: [1700, 1300],
    expected: [],
  },
];

const badData = [
  [-900, -1200],
  [0, -1200],
  [-1200, 0],
  ['-1200', 0],
  [-1200, '0'],
  ['-1200', '0'],
];

let data;

beforeEach(() => {
  data = ld.cloneDeep(testData);
});

describe('getTimeInterval helper function', () => {
  it("it throws an error when time formatting isn't proper", () => {
    badData.forEach((entry) => {
      const startTime = entry[0];
      const endTime = entry[1];

      expect(() => {
        getTimeInterval(startTime, endTime);
      }).toThrow(/invalid argument/);
    });
  });

  it('generates intervals from from stating and ending time', () => {
    data.forEach((entry) => {
      const startTime = entry.input[0];
      const endTime = entry.input[1];

      const output = getTimeInterval(startTime, endTime);
      expect(output).toEqual(entry.expected);
    });
  });
});
