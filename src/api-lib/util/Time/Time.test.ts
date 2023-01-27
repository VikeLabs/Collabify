import { Time } from '.';

const toNumTestCases = [
  { input: '8:00 am', expected: 8 * 3600 },
  { input: '8:00 pm', expected: 8 * 3600 + 12 * 3600 },
  { input: '12:30 pm', expected: 12 * 3600 + 30 * 60 + 12 * 3600 },
];

const toStrTestCases = [
  { expected: '8:00 am', input: 8 * 3600 },
  { expected: '8:00 pm', input: 8 * 3600 + 12 * 3600 },
  { expected: '12:30 pm', input: 12 * 3600 + 30 * 60 + 12 * 3600 },
];

describe('Test suit for Time', () => {
  it('convert time to number', () => {
    toNumTestCases.forEach((test) => {
      const result = Time.toNumber(test.input);
      expect(result).toEqual(test.expected);
    });
  });

  it('converts time to string [hh:mm am/pm]', () => {
    toStrTestCases.forEach((test) => {
      const result = Time.toStr(test.input);
      expect(result).toEqual(test.expected);
    });
  });
});
