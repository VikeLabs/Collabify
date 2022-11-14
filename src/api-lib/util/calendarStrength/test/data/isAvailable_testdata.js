const passedTests = [
  // returns true
  {
    event: { start: 1000, end: 1200 },
    avail: { start: 1000, end: 1300 },
    expected: true,
  },
  {
    event: { start: 900, end: 1000 },
    avail: { start: 800, end: 1000 },
    expected: true,
  },
  {
    event: { start: 1330, end: 1400 },
    avail: { start: 1300, end: 1500 },
    expected: true,
  },
  {
    event: { start: 1330, end: 1400 },
    avail: { start: 1330, end: 1500 },
    expected: true,
  },
  {
    event: { start: 1330, end: 1500 },
    avail: { start: 1330, end: 1500 },
    expected: true,
  },
  // returns false
  {
    event: { start: 900, end: 1130 },
    avail: { start: 900, end: 1000 },
    expected: false,
  },
  {
    event: { start: 1000, end: 1200 },
    avail: { start: 1100, end: 1100 },
    expected: false,
  },
  {
    event: { start: 900, end: 1130 },
    avail: { start: 1000, end: 1230 },
    expected: false,
  },
  {
    event: { start: 900, end: 1130 },
    avail: { start: 800, end: 1030 },
    expected: false,
  },
];

const failedType = [
  {
    event: { start: 123, end: '1130' },
    avail: { start: '1000', end: 123 },
  },
  {
    event: { start: '900', end: 1130 },
    avail: { start: 800, end: '1030' },
  },
];

const failedArg = [
  {
    event: { start: 900, end: 1200 },
    avail: undefined,
  },
  {
    event: undefined,
    avail: { start: 900, end: 1200 },
  },
  {},
];

export { passedTests, failedType, failedArg };
