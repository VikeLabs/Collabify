export const isAvailable = (event, avail) => {
  if (event.start >= avail.start && event.end <= avail.end) return true;
  return false;
};
