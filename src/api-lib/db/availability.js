import { ApiError } from 'api-lib/util/apiError';
import prisma from '../prisma'

export const createAvailability = async ({ groupID, availability }) => {
  try {
    const availabilityModal = await prisma.availability.create({
      data: {
        availability,
        groupID,
      },
    });
    return availabilityModal ? { err: new ApiError('Error creating AVAILABILITY', 500) } : { err: null };
  } catch (e) {
    return {
      err: new ApiError(e, 500)
    };
  }
};

export const getAvailabilities = async (groupAvailabilities) => {
  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        id: { in: groupAvailabilities },
      },
    });
    return availabilities
      ? { availabilities, availabilitiesError: null }
      : {
        availabilities: null,
        availabilitiesError: new NotFoundError(`Availability not found`),
        };
  } catch (e) {
    return {
      availabilities: null,
      availabilitiesError: new ApiError(e, 500),
    };
  }
};

