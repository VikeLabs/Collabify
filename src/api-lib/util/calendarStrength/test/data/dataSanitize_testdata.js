const input = [
  {
    weekOf: '2022-10-30',
    times: [
      {
        startStr: '2022-10-30T09:30:00',
        endStr: '2022-10-30T11:00:00',
      },
      {
        startStr: '2022-10-31T13:30:00',
        endStr: '2022-10-31T17:00:00',
      },
      {
        startStr: '2022-11-01T08:00:00',
        endStr: '2022-11-01T16:30:00',
      },
    ],
    userName: 'Ben',
    userNumber: '125',
  },
  {
    weekOf: '2022-10-30',
    times: [
      {
        startStr: '2022-10-30T10:00:00',
        endStr: '2022-10-30T12:00:00',
      },
      {
        startStr: '2022-10-31T13:30:00',
        endStr: '2022-10-31T15:00:00',
      },
      {
        startStr: '2022-11-01T09:00:00',
        endStr: '2022-11-01T16:30:00',
      },
    ],
    userName: 'Aman',
    userNumber: '143',
  },
  {
    weekOf: '2022-10-30',
    times: [
      {
        startStr: '2022-10-30T11:30:00',
        endStr: '2022-10-30T14:00:00',
      },
      {
        startStr: '2022-10-31T15:00:00',
        endStr: '2022-10-31T17:00:00',
      },
      {
        startStr: '2022-11-01T11:00:00',
        endStr: '2022-11-01T17:30:00',
      },
    ],
    userName: 'Hal',
    userNumber: '123',
  },
];

const expectedDates = [
  {
    date: 20221030,
    times: [
      { start: 930, end: 1000 },
      { start: 1000, end: 1100 },
      { start: 1100, end: 1130 },
      { start: 1130, end: 1200 },
      { start: 1200, end: 1400 },
    ],
  },
  {
    date: 20221031,
    times: [
      { start: 1330, end: 1500 },
      { start: 1500, end: 1700 },
    ],
  },
  {
    date: 20221101,
    times: [
      { start: 800, end: 900 },
      { start: 900, end: 1100 },
      { start: 1100, end: 1630 },
      { start: 1630, end: 1730 },
    ],
  },
];

const expectedPeople = [
  {
    name: 'Ben',
    number: '125',
    timesAvailable: [
      { date: 20221030, times: { start: 930, end: 1100 } },
      { date: 20221031, times: { start: 1330, end: 1700 } },
      { date: 20221101, times: { start: 800, end: 1630 } },
    ],
  },
  {
    name: 'Aman',
    number: '143',
    timesAvailable: [
      { date: 20221030, times: { start: 1000, end: 1200 } },
      { date: 20221031, times: { start: 1330, end: 1500 } },
      { date: 20221101, times: { start: 900, end: 1630 } },
    ],
  },
  {
    name: 'Hal',
    number: '123',
    timesAvailable: [
      { date: 20221030, times: { start: 1130, end: 1400 } },
      { date: 20221031, times: { start: 1500, end: 1700 } },
      { date: 20221101, times: { start: 1100, end: 1730 } },
    ],
  },
];

export { input, expectedDates, expectedPeople };
