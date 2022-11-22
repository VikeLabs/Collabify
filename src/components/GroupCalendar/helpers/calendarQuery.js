import * as iCalEvent from 'icalevent';

//

const event = {
  start: [2023, 5, 30, 6, 30],
  duration: { hours: 6, minutes: 30 },
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
};

//

export const calendarQuery = (calendarType, start, end, title, details) => {
  switch (calendarType) {
    case 'GOOGLE':
      let query = 'https://calendar.google.com/calendar/u/0/r/eventedit';
      query += `?dates=${start}/${end}`;
      query += `&text=${title.replace(' ', '+')}`;
      query += `&details=${details.replace(' ', '+')}`;
      return query;

    case 'APPLE':
      const event = new iCalEvent({
        uid: 9873647,
        offset: new Date().getTimezoneOffset(),
        method: 'request',
        status: 'confirmed',
        start: start,
        end: end,
        timezone: 'US/Central',
        summary: 'Priestly Duties',
        description: 'Home flu visit.',
      });

      const icsFile = event.toFile();

      window.open('data:text/calendar;charset=utf8,' + icsFile);
      console.log(event.toFile());

      return;

    default:
      console.warn('invalid calendar type');
  }
};
