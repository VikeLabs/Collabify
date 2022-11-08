export const determineBackground = (namesLength, peopleLength) => {
  const percent = (namesLength / peopleLength) * 100;
  let color = 'transparent';
  if (percent > 75) {
    color = '#228b22';
  } else if (percent > 50) {
    color = '#48B613';
  } else if (percent > 25) {
    color = '#77dd77';
  } else if (percent > 0) {
    color = '#aef5ae';
  }
  return color;
};
