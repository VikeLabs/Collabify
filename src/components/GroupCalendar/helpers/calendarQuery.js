export const calendarQuery = (calendarType, start, end, title) => {
  switch (calendarType) {
    case 'GOOGLE':
      let query = 'https://calendar.google.com/calendar/u/0/r/eventedit';
      query += `?dates=${start}/${end || '20230527T170000Z'}`; // TODO: delete dummy time
      query += `&text=${title.replace(' ', '+')}`;
      return query;
    default:
      console.warn('invalid calendar type');
  }
};
