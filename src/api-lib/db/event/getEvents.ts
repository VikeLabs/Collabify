import prisma from 'api-lib/prisma';

export interface ParsedEvent {
  title: string;
  start: number;
  end: number;
  description: string;
  display: string;
  backgroundColor: string;
}

export const getEvents = async (groupID: number): Promise<ParsedEvent[]> => {
  const events = await prisma.event.findMany({
    where: { groupID },
  });

  return events.map((event) => ({
    title: event.title,
    start: event.startTime,
    end: event.endTime,
    description: event.description,
    display: 'block',
    backgroundColor: '#fb8500',
  }));
};
