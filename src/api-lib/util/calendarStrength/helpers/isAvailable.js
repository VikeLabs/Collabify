/**
 * isAvailable
 * @params {object} event
 * @params {object} avail
 * @return {boolean}
 */
export const isAvailable = (event, avail) => {
  return event.start >= avail.start && event.end <= avail.end;
};
