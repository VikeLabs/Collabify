import { expect, it, describe } from '@jest/globals';
import { determineBackground } from '../helpers/determineBackground';
import { failedTests, passedTests } from './data/determineBackground_testdata';

describe('tests for helper `determineBackground()`', () => {
  it('returns the correct color values', () => {
    passedTests.forEach((test) => {
      const output = determineBackground(test.namesLength, test.peopleLength);
      expect(output).toBe(test.expected);
    });
  });

  it('throws an error if `namesLength` is greater than `peopleLength`', () => {
    failedTests.forEach((test) => {
      expect(() => {
        return determineBackground(test.namesLength, test.peopleLength);
      }).toThrow();
    });
  });
});
