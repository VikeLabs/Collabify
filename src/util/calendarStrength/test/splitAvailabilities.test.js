import { describe, it, expect } from "@jest/globals";
import { splitAvailabilities } from "../index.js";

const availabilities = [
  {
    weekOf: "2022-10-30",
    times: [
      {
        startTime: "2022-10-30T09:30:00",
        endTime: "2022-10-30T11:00:00",
      },
      {
        startTime: "2022-10-31T13:30:00",
        endTime: "2022-10-31T17:00:00",
      },
      {
        startTime: "2022-11-01T08:00:00",
        endTime: "2022-11-01T16:30:00",
      },
    ],
    name: "Ben",
    number: "125",
  },
  {
    weekOf: "2022-10-30",
    times: [
      {
        startTime: "2022-10-30T10:00:00",
        endTime: "2022-10-30T12:00:00",
      },
      {
        startTime: "2022-10-31T13:30:00",
        endTime: "2022-10-31T15:00:00",
      },
      {
        startTime: "2022-11-01T09:00:00",
        endTime: "2022-11-01T16:30:00",
      },
    ],
    name: "Aman",
    number: "143",
  },
  {
    weekOf: "2022-10-30",
    times: [
      {
        startTime: "2022-10-30T11:30:00",
        endTime: "2022-10-30T14:00:00",
      },
      {
        startTime: "2022-10-31T15:00:00",
        endTime: "2022-10-31T17:00:00",
      },
      {
        startTime: "2022-11-01T11:00:00",
        endTime: "2022-11-01T17:30:00",
      },
    ],
    name: "Hal",
    number: "123",
  },
];

const expected = [
  {
    isEvent: false,
    start: "2022-10-30T09:30:00",
    end: "2022-10-30T10:00:00",
    display: "background",
    names: ["Ben"],
    numbers: ["125"],
  },
  {
    isEvent: false,
    start: "2022-10-30T10:00:00",
    end: "2022-10-30T11:00:00",
    display: "background",
    names: ["Ben", "Aman"],
    numbers: ["125", "143"],
  },
  {
    isEvent: false,
    start: "2022-10-30T11:00:00",
    end: "2022-10-30T11:30:00",
    display: "background",
    names: ["Aman"],
    numbers: ["143"],
  },
  {
    isEvent: false,
    start: "2022-10-30T11:30:00",
    end: "2022-10-30T12:00:00",
    display: "background",
    names: ["Aman", "Hal"],
    numbers: ["143", "123"],
  },
  {
    isEvent: false,
    start: "2022-10-30T12:00:00",
    end: "2022-10-30T14:00:00",
    display: "background",
    names: ["Hal"],
    numbers: ["123"],
  },
  {
    isEvent: false,
    start: "2022-10-31T13:30:00",
    end: "2022-10-31T15:00:00",
    display: "background",
    names: ["Ben", "Aman"],
    numbers: ["125", "143"],
  },
  {
    isEvent: false,
    start: "2022-10-31T15:00:00",
    end: "2022-10-31T17:00:00",
    display: "background",
    names: ["Ben", "Hal"],
    numbers: ["125", "123"],
  },
  {
    isEvent: false,
    start: "2022-11-01T08:00:00",
    end: "2022-11-01T09:00:00",
    display: "background",
    names: ["Ben"],
    numbers: ["125"],
  },
  {
    isEvent: false,
    start: "2022-11-01T09:00:00",
    end: "2022-11-01T11:00:00",
    display: "background",
    names: ["Ben", "Aman"],
    numbers: ["125", "143"],
  },
  {
    isEvent: false,
    start: "2022-11-01T11:00:00",
    end: "2022-11-01T16:30:00",
    display: "background",
    names: ["Ben", "Aman", "Hal"],
    numbers: ["125", "143", "123"],
  },
  {
    isEvent: false,
    start: "2022-11-01T16:30:00",
    end: "2022-11-01T17:30:00",
    display: "background",
    names: ["Hal"],
    numbers: ["123"],
  },
];

describe("splitAvailabilities() test", () => {
  it("returns the right format", () => {
    const input = {
      availabilities,
    };
    const output = splitAvailabilities(input);
    expect(output).toStrictEqual(expected);
  });
});
