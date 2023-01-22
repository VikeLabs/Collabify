import { ApiError } from 'api-lib/util/apiError';
import prisma from '../prisma';

export const createEvent = async ({ groupID, event }) => {
  try {
    const eventModal = await prisma.event.create({
      data: {
        event,
        groupID,
      },
    });
    return eventModal
      ? { err: new ApiError('Error creating EVENT', 500) }
      : { err: null };
  } catch (e) {
    return {
      err: new ApiError(e, 500),
    };
  }
};

export const deleteEvent = async ({ groupID, eventID }) => {
  // TODO: Create delete event
};
