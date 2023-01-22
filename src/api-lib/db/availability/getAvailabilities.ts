import { Availability } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';
import prisma from 'api-lib/prisma';

interface GetAvailabilitiesResult {
  availabilities?: Availability[];
  availabilitiesError?: ApiError;
}
export const getAvailabilities = async (
  groupAvailabilities: number[]
): Promise<GetAvailabilitiesResult> => {
  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        id: { in: groupAvailabilities },
      },
    });

    if (availabilities.length === 0) {
      return {
        availabilitiesError: new ApiError(
          `no content found for ${groupAvailabilities}`,
          204
        ),
      };
    }

    return { availabilities };
  } catch (e) {
    return {
      availabilitiesError: new ApiError(e, 500),
    };
  }
};
