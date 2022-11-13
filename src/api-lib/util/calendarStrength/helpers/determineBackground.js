import { colors as c } from './_bgColors';

export const determineBackground = (namesLength, peopleLength) => {
  const percent = (namesLength / peopleLength) * 100;
  let color = c.transparent;
  if (percent > 75) {
    color = c.strength4;
  } else if (percent > 50) {
    color = c.strength3;
  } else if (percent > 25) {
    color = c.strength2;
  } else if (percent > 0) {
    color = c.strength1;
  }
  return color;
};
