import prisma from 'api-lib/prisma';
import { ApiError } from 'api-lib/util/apiError';
import { Time } from 'api-lib/util/time';

interface NewEvent {
  title: string;
  description: string;
  time: {
    start: string;
    end: string;
  };
}

const createEvent = async (
  e: NewEvent,
  groupID: number
): Promise<ApiError | null> => {
  try {
    await prisma.event.create({
      data: {
        groupID,
        title: e.title,
        description: e.description,
        startTime: Time.toSecond(e.time.start),
        startTimeStr: e.time.start,
        endTime: Time.toSecond(e.time.end),
        endTimeStr: e.time.end,
      },
    });
  } catch (e) {
    return new ApiError(`[ERROR] new event: ${e}`, 404);
  }
};

export { createEvent, type NewEvent };
