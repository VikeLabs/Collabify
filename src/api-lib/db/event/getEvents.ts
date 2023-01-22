import prisma from 'api-lib/prisma';
import { Event } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';

interface GetEventResult {
  events?: Event[];
  eventsError?: ApiError;
}

type GetEvents = (groupID: number) => Promise<GetEventResult>;

export const getEvents: GetEvents = async (groupID: number) => {
  try {
    const events = await prisma.event.findMany({
      where: { groupID },
    });

    return { events };
  } catch (e) {
    return { eventsError: new ApiError(e, 500) };
  }
};
