import { Time } from '.';

const toNumTestCases = [
  { input: '2023-01-30T13:00:00-08:00', expected: 13 * 3600 },
  { input: '2023-01-30T13:30:00-08:00', expected: 13 * 3600 + 30 * 60 },
];

describe('Test suit for Time', () => {
  it('convert time to number', () => {
    toNumTestCases.forEach((test) => {
      const result = Time.toSecond(test.input);
      expect(result).toEqual(test.expected);
    });
  });
});
