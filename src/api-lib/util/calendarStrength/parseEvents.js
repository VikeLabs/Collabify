export const parseEvents = (events) => {
  return events.map((event) => {
    return {
      start: event.time.start,
      end: event.time.end,
      display: 'block',
      title: event.title,
      description: event.description,
      backgroundColor: '#fb8500',
    };
  });
};
