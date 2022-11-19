const localToUTCTime = (time) => {
  const localTime = new Date(time);

  const utcYear = localTime.getUTCFullYear();
  const utcMonth = localTime.getUTCMonth() + 1; // needs to be added one since month starts with 0 in JS :/
  const utcDate = localTime.getUTCDate();

  let utcHour = localTime.getUTCHours();
  utcHour = String(utcHour).padStart(2, '0');

  let utcMinute = localTime.getUTCMinutes();
  utcMinute = String(utcMinute).padStart(2, '0');

  return `${utcYear}${utcMonth}${utcDate}T${utcHour}${utcMinute}00Z`;
};

export { localToUTCTime };
