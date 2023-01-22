import { Event } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { ApiError } from 'api-lib/util/apiError';

interface NewEvent {
  groupID: number;
  event: Event;
}

type CreateEvent = (prop: NewEvent) => Promise<ApiError | undefined>;

export const createEvent: CreateEvent = async ({ event, groupID }) => {
  try {
    await prisma.event.create({ data: { ...event, groupID } });
    return;
  } catch (e) {
    return new ApiError(e, 500);
  }
};
