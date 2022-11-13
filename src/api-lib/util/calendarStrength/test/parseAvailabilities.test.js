import { describe, it, expect } from '@jest/globals';
import { parseAvailabilities } from '../parseAvailabilities';
import {
  expected,
  input,
  sqnInput,
  sqnOutput,
} from './data/parseAvailability_testdata';

describe('parseAvailabilities() test', () => {
  it('returns the right format', () => {
    const results = parseAvailabilities(input);
    for (let i = 0; i < results.length - 1; i++) {
      const result = results[i];
      const output = expected[i];

      // has colors
      expect(result.backgroundColor).toBeDefined();
      expect(result.display).toBeDefined();
      expect(result.start).toEqual(output.start);
      expect(result.end).toEqual(output.end);
      expect(result.names).toStrictEqual(output.names);
    }
  });

  it('still does it sequentially', () => {
    const results = parseAvailabilities(sqnInput);
    for (let i = 0; i < results.length - 1; i++) {
      const result = results[i];
      const output = sqnOutput[i];

      // has colors
      expect(result.backgroundColor).toBeDefined();
      expect(result.display).toBeDefined();
      expect(result.start).toEqual(output.start);
      expect(result.end).toEqual(output.end);
      expect(result.names).toStrictEqual(output.names);
    }
  });
});
