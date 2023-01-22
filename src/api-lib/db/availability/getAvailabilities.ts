import { Availability } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';
import prisma from 'api-lib/prisma';

interface GetAvailabilitiesResult {
  availabilities?: Availability[];
  availabilitiesError?: ApiError;
}
export const getAvailabilities = async (
  groupID: number
): Promise<GetAvailabilitiesResult> => {
  try {
    const availabilities = await prisma.availability.findMany({
      where: { groupID },
    });

    return { availabilities };
  } catch (e) {
    return {
      availabilitiesError: new ApiError(e, 500),
    };
  }
};
