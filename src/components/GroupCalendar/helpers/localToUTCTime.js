const localToUTCTime = (time) => {
  const localTime = new Date(time);

  const utcYear = localTime.getUTCFullYear();
  const utcMonth = localTime.getUTCMonth();
  const utcDate = localTime.getUTCDate();

  const utcHour = localTime.getUTCHours();
  const utcMinute = localTime.getUTCMinutes();

  return `${utcYear}${utcMonth}${utcDate}T${utcHour}${utcMinute}00Z`;
};

export { localToUTCTime };
