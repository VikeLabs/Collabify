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

const expected = [
  {
    start: '2022-10-30T09:30:00',
    end: '2022-10-30T10:00:00',
    display: 'background',
    names: ['Ben'],
    numbers: ['125'],
  },
  {
    start: '2022-10-30T10:00:00',
    end: '2022-10-30T11:00:00',
    display: 'background',
    names: ['Ben', 'Aman'],
    numbers: ['125', '143'],
  },
  {
    start: '2022-10-30T11:00:00',
    end: '2022-10-30T11:30:00',
    display: 'background',
    names: ['Aman'],
    numbers: ['143'],
  },
  {
    start: '2022-10-30T11:30:00',
    end: '2022-10-30T12:00:00',
    display: 'background',
    names: ['Aman', 'Hal'],
    numbers: ['143', '123'],
  },
  {
    start: '2022-10-30T12:00:00',
    end: '2022-10-30T14:00:00',
    display: 'background',
    names: ['Hal'],
    numbers: ['123'],
  },
  {
    start: '2022-10-31T13:30:00',
    end: '2022-10-31T15:00:00',
    display: 'background',
    names: ['Ben', 'Aman'],
    numbers: ['125', '143'],
  },
  {
    start: '2022-10-31T15:00:00',
    end: '2022-10-31T17:00:00',
    display: 'background',
    names: ['Ben', 'Hal'],
    numbers: ['125', '123'],
  },
  {
    start: '2022-11-01T08:00:00',
    end: '2022-11-01T09:00:00',
    display: 'background',
    names: ['Ben'],
    numbers: ['125'],
  },
  {
    start: '2022-11-01T09:00:00',
    end: '2022-11-01T11:00:00',
    display: 'background',
    names: ['Ben', 'Aman'],
    numbers: ['125', '143'],
  },
  {
    start: '2022-11-01T11:00:00',
    end: '2022-11-01T16:30:00',
    display: 'background',
    names: ['Ben', 'Aman', 'Hal'],
    numbers: ['125', '143', '123'],
  },
  {
    start: '2022-11-01T16:30:00',
    end: '2022-11-01T17:30:00',
    display: 'background',
    names: ['Hal'],
    numbers: ['123'],
  },
];

/* Sequential test cases starts */
// multiple people selected one time slot sequentially
const sqnInput = [
  {
    weekOf: '2022-10-30',
    times: [
      {
        startStr: '2022-10-30T01:00:00',
        endStr: '2022-10-30T01:30:00',
      },
      {
        startStr: '2022-10-31T13:30:00',
        endStr: '2022-10-31T14:30:00',
      },
    ],
    userName: 'Ben',
    userNumber: '125',
  },
  {
    weekOf: '2022-10-30',
    times: [
      {
        startStr: '2022-10-30T01:30:00',
        endStr: '2022-10-30T02:00:00',
      },
      {
        startStr: '2022-10-31T14:30:00',
        endStr: '2022-10-31T15:30:00',
      },
    ],
    userName: 'Aman',
    userNumber: '143',
  },
  {
    weekOf: '2022-10-30',
    times: [
      {
        startStr: '2022-10-30T02:00:00',
        endStr: '2022-10-30T02:30:00',
      },
      {
        startStr: '2022-10-31T15:30:00',
        endStr: '2022-10-31T16:30:00',
      },
    ],
    userName: 'Hal',
    userNumber: '123',
  },
];

const sqnOutput = [
  // Sequential output
  {
    start: '2022-10-30T01:00:00',
    end: '2022-10-30T01:30:00',
    display: 'background',
    names: ['Ben'],
    numbers: ['125'],
  },
  {
    start: '2022-10-30T01:30:00',
    end: '2022-10-30T02:00:00',
    display: 'background',
    names: ['Aman'],
    numbers: ['125'],
  },
  {
    start: '2022-10-30T02:00:00',
    end: '2022-10-30T02:30:00',
    display: 'background',
    names: ['Hal'],
    numbers: ['125'],
  },
  //
  {
    start: '2022-10-31T13:30:00',
    end: '2022-10-31T14:30:00',
    display: 'background',
    names: ['Ben'],
    numbers: ['125'],
  },
  {
    start: '2022-10-31T14:30:00',
    end: '2022-10-31T15:30:00',
    display: 'background',
    names: ['Aman'],
    numbers: ['125'],
  },
  {
    start: '2022-10-31T15:30:00',
    end: '2022-10-31T16:30:00',
    display: 'background',
    names: ['Hal'],
    numbers: ['125'],
  },
  // Sequential output
];
// Consequential test cases ends

export { expected, input, sqnInput, sqnOutput };
