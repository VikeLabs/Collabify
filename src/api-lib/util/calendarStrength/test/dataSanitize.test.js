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
      const { events } = dataSanitize(input);
      expect(events).toStrictEqual(expectedDates);
    });
  });

  describe('sanitized `people` data', () => {
    it('returns an array with appropriate people data', () => {
      const { people } = dataSanitize(input);
      expect(people).toStrictEqual(expectedPeople);
    });
  });
});
