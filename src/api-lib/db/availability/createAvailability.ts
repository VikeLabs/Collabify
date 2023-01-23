import { Availability } from '@prisma/client';
import prisma from 'api-lib/prisma';

export const createAvailability = async (
  groupID: number,
  availability: Availability
): Promise<void> => {
  availability.groupID = groupID; // attach the proper group id
  await prisma.availability.create({
    data: availability,
  });
};
