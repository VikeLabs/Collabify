export const determineBackground = (namesLength, peopleLength) => {
  const percent = (namesLength / peopleLength) * 100;
  let color = 'transparent';
  if (percent > 75) {
    color = '#3db526';
  } else if (percent > 50) {
    color = '#54d93b';
  } else if (percent > 25) {
    color = '#77dd77';
  } else if (percent > 0) {
    color = '#aef5ae';
  }
  return color;
};
