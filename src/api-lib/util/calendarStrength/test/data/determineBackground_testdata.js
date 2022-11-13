import { bgColors } from '../../helpers/determineBackground';

const passedTests = [
  { namesLength: 80, peopleLength: 100, expected: bgColors.gt75 },
  { namesLength: 75, peopleLength: 100, expected: bgColors.gt75 },
  { namesLength: 60, peopleLength: 100, expected: bgColors.gt50 },
  { namesLength: 50, peopleLength: 100, expected: bgColors.gt50 },
  { namesLength: 35, peopleLength: 100, expected: bgColors.gt25 },
  { namesLength: 25, peopleLength: 100, expected: bgColors.gt25 },
  { namesLength: 0, peopleLength: 100, expected: bgColors.transparent },
];

const failedTests = [
  { namesLength: 90, peopleLength: 80 },
  { namesLength: 95, peopleLength: 75 },
  { namesLength: 75, peopleLength: 50 },
];

export { passedTests, failedTests };
