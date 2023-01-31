import prisma from 'api-lib/prisma';

export interface ParsedEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  display: string;
  backgroundColor: string;
}

export const getEvents = async (groupID: number): Promise<ParsedEvent[]> => {
  const events = await prisma.event.findMany({
    where: { groupID },
    select: {
      title: true,
      startTimeStr: true,
      endTimeStr: true,
      description: true,
    },
  });

  return events.map((event) => ({
    title: event.title,
    start: event.startTimeStr,
    end: event.endTimeStr,
    description: event.description,
    display: 'block',
    backgroundColor: '#fb8500',
  }));
};
