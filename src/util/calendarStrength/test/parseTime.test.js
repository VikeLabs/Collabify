import ld from "lodash";
import { parseTime } from "../helpers/parseTime.js";

const data = [
  {
    input: "2022-10-30T09:30:00",
    expected: [20221030, 930],
  },
  {
    input: "2022-10-30T11:00:00",
    expected: [20221030, 1100],
  },
  {
    input: "2022-10-31T13:30:00",
    expected: [20221031, 1330],
  },
  {
    input: "2022-10-31T17:00:00",
    expected: [20221031, 1700],
  },
  {
    input: "2022-11-01T08:00:00",
    expected: [20221101, 800],
  },
  {
    input: "2022-11-01T16:30:00",
    expected: [20221101, 1630],
  },
];

let times;

beforeEach(() => {
  /* in case the function mutates the `times` array,
   * then the data array is untouched for subsequence
   * tests */
  times = ld.cloneDeep(data);
});

describe("`parseTime` functions", () => {
  it("splits by alpha delim", () => {
    times.forEach((time) => {
      const output = parseTime(time.input);
      expect(output.length).toBe(2);
    });
  });

  it("converts time into an array of int", () => {
    times.forEach((time) => {
      const output = parseTime(time.input);
      expect(typeof output[0]).toBe("number");
      expect(typeof output[1]).toBe("number");
    });
  });

  it("formats properly", () => {
    for (let i = 0; i < data.length; i++) {
      const output = parseTime(times[i].input);
      expect(output[0]).toEqual(data[i].expected[0]);
      expect(output[1]).toEqual(data[i].expected[1]);
    }
  });
});
