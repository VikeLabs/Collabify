import { describe, it, expect } from '@jest/globals';
import { isAvailable } from '../helpers/isAvailable';
import {
  passedTests,
  failedType,
  failedArg,
} from './data/isAvailable_testdata';
import { InvalidArguments } from '../calendarStrengthExceptions';

describe('isAvailable() test', () => {
  it('returns the correct boolean value', () => {
    passedTests.forEach((test) => {
      const { event, avail, expected } = test;

      const output = isAvailable(event, avail);
      expect(output).toBe(expected);
    });
  });

  describe('isAvailable() raises exceptions', () => {
    it('throws TypeError', () => {
      failedType.forEach((test) => {
        const { event, avail } = test;
        expect(() => isAvailable(event, avail)).toThrow(TypeError);
      });
    });

    it('throws InvalidArguments', () => {
      failedArg.forEach((test) => {
        const { event, avail } = test;
        expect(() => isAvailable(event, avail)).toThrow(InvalidArguments);
      });
    });
  });
});
