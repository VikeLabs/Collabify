/**
 * isAvailable
 * @params {object} event
 * @params {object} avail
 * @return {boolean}
 */
export const isAvailable = (event, avail) => {
  if (!avail) return false;
  return event.start >= avail.start && event.end <= avail.end;
};
