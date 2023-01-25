import { describe, it, expect } from '@jest/globals';
import { isAvailable } from '../helpers/isAvailable';
import { passedTests } from './data/isAvailable_testdata';

describe('isAvailable() test', () => {
  it('returns the correct boolean value', () => {
    passedTests.forEach((test) => {
      const { event, avail, expected } = test;

      const output = isAvailable(event, avail);
      expect(output).toBe(expected);
    });
  });
});
