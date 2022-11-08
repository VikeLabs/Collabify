export const parseEvents = (events) => {
  return events.map((event) => {
    return {
      isEvent: true,
      start: event.time.startTime,
      end: event.time.endTime,
      display: 'block',
      title: event.title,
      description: event.description,
    };
  });
};
