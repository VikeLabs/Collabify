import type { TimeObject } from 'api-lib/util/calendarStrength/types';

export const isAvailable = (event: TimeObject, avail: TimeObject) => {
  return event.start >= avail.start && event.end <= avail.end;
};
