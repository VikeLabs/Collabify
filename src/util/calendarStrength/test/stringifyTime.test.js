import { expect, it, describe } from "@jest/globals";

import { stringifyTime } from "../helpers/stringifyTime.js";

const data = [
  { input: [20221030, 1000], expected: "2022-10-30T10:00:00" },
  { input: [20221030, 1200], expected: "2022-10-30T12:00:00" },
  { input: [20221030, 1630], expected: "2022-10-30T16:30:00" },
  { input: [20221030, 630], expected: "2022-10-30T06:30:00" },
  { input: [20221030, 600], expected: "2022-10-30T06:00:00" },
];

describe("tests for helper function stringifyTime", () => {
  it("returns a string", () => {
    data.forEach((entry) => {
      const date = entry.input[0];
      const time = entry.input[1];
      const output = stringifyTime(date, time);
      expect(typeof output).toBe("string");
    });
  });

  it("formats output properly", () => {
    data.forEach((entry) => {
      const date = entry.input[0];
      const time = entry.input[1];
      const output = stringifyTime(date, time);
      expect(output).toBe(entry.expected);
    });
  });
});
