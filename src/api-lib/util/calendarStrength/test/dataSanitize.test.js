import { expect, it, describe } from '@jest/globals';
import { dataSanitize } from '../helpers/dataSanitize';
import {
  input,
  expectedPeople,
  expectedDates,
} from './data/dataSanitize_testdata.js';

describe('dataSanitize tests', () => {
  describe('sanitized `date` data', () => {
    it('returns an array with appropriate dates data', () => {
      const [date, _] = dataSanitize(input);
      expect(date).toStrictEqual(expectedDates);
    });
  });

  describe('sanitized `people` data', () => {
    it('returns an array with appropriate people data', () => {
      const [_, people] = dataSanitize(input);
      expect(people).toStrictEqual(expectedPeople);
    });
  });
});
