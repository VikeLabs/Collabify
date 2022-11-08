import { describe, it, expect } from "@jest/globals";
import { isAvailable } from "../helpers/isAvailable.js";

describe("isAvailable() test", () => {
  it("returns true if is available", () => {
    const event = { start: 930, end: 1130 };
    const avail = { start: 1000, end: 1200 };

    const output = isAvailable(event, avail);
    expect(output).toBe(false);
  });

  it("returns false if is not available", () => {
    const event = { start: 1200, end: 1230 };
    const avail = { start: 1000, end: 1200 };

    const output = isAvailable(event, avail);
    expect(output).toBe(false);
  });
});
