import { ApiError } from 'api-lib/util/apiError';
import prisma from '../prisma'

export const createEvent = async ({ groupID, event }) => {
  try {
    const eventModal = await prisma.event.create({
      data: {
        event,
        groupID,
      },
    });
    return eventModal ? { err: new ApiError('Error creating EVENT', 500) } : { err: null };
  } catch (e) {
    return {
      err: new ApiError(e, 500)
    };
  }
};

export const deleteEvent = async ({ groupID, eventID }) => {
  // TODO: Create delete event
};

export const getEvents = async (groupEvents) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        id: { in: groupEvents },
      },
    });
    return events
      ? { events, eventsError: null }
      : {
        events: null,
        eventsError: new NotFoundError(`Event not found`),
        };
  } catch (e) {
    return {
      events: null,
      eventsError: new ApiError(e, 500),
    };
  }
};
