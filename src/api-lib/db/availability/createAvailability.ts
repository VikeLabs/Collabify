import { Availability } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';
import prisma from 'api-lib/prisma';

export const createAvailability = async (
  availability: Availability
): Promise<ApiError | undefined> => {
  try {
    await prisma.availability.create({
      data: availability,
    });
    return;
  } catch (e) {
    return new ApiError(e, 500);
  }
};
