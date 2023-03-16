import prisma from 'api-lib/prisma';

export interface ParsedEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  display: string;
  backgroundColor: string;
}

export const getEvents = async (groupID: number) => {
  const events = await prisma.event.findMany({
    where: { groupID },
    select: {
      title: true,
      startTimeStr: true,
      endTimeStr: true,
      description: true,
    },
  });

  return events;
};
