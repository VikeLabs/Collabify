export const calendarQuery = (calendarType, start, end, title, details) => {
  switch (calendarType) {
    case 'GOOGLE':
      let query = 'https://calendar.google.com/calendar/u/0/r/eventedit';
      query += `?dates=${start}/${end}`;
      query += `&text=${title.replace(' ', '+')}`;
      query += `&details=${details.replace(' ', '+')}`;
      return query;
    default:
      console.warn('invalid calendar type');
  }
};
