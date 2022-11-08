export const stringifyTime = (date, time) => {
  if (typeof date !== "number" || typeof time !== "number") {
    throw new TypeError(
      `invalid argument type. expected [number number], got [${typeof date} ${typeof time}]`
    );
  }

  // format date
  let dateStr = String(date);
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6);

  dateStr = [year, month, day].join("-");

  // handle time
  let timeStr = String(time);

  if (timeStr.length < 4) {
    timeStr = `0${timeStr}00`;
  } else {
    timeStr += "00";
  }

  const timeComponent = [];
  let charIndex = 0;

  while (charIndex < timeStr.length) {
    timeComponent.push(timeStr.slice(charIndex, charIndex + 2));
    charIndex += 2;
  }

  timeStr = timeComponent.join(":");

  return [dateStr, timeStr].join("T");
};
