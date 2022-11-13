const c = {
  transparent: 'transparent',
  gt75: '#228b22',
  gt50: '#48B613',
  gt25: '#77dd77',
  gt0: '#aef5ae',
};

const determineBackground = (namesLength, peopleLength) => {
  const percent = (namesLength / peopleLength) * 100;

  if (percent > 75) {
    return c.gt75;
  } else if (percent > 50) {
    return c.gt50;
  } else if (percent > 25) {
    return c.gt25;
  } else if (percent > 0) {
    return c.gt0;
  }

  return c.transparent;
};

export { c as bgColors, determineBackground };
