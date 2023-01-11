import { InvalidArguments } from '../calendarStrengthExceptions';

const _c = {
  transparent: 'transparent',
  gt75: '#228b22',
  gt50: '#48B613',
  gt25: '#77dd77',
  gt0: '#aef5ae',
};

const determineBackground = (namesLength, highestNamesLength) => {
  // Names length divided by the highest names length will give a color strength
  if (
    typeof namesLength !== 'number' ||
    typeof highestNamesLength !== 'number'
  ) {
    throw new TypeError(
      `expected [number:number], got [${typeof namesLength}:${typeof highestNamesLength}]`
    );
  }

  if (namesLength > highestNamesLength) {
    let err = `_namesLength_ is greater than _highestNamesLength_.\n`;
    err += `got [${namesLength}:${highestNamesLength}] ([namesLength:highestNamesLength])`;
    throw new InvalidArguments(err);
  }

  const percent = (namesLength / highestNamesLength) * 100;

  if (percent >= 75) {
    return _c.gt75;
  } else if (percent >= 50) {
    return _c.gt50;
  } else if (percent >= 25) {
    return _c.gt25;
  } else if (percent > 0) {
    return _c.gt0;
  }

  return _c.transparent;
};

export {
  _c as bgColors, // for testings only, this is not to be accessed anywhere else
  determineBackground,
};
