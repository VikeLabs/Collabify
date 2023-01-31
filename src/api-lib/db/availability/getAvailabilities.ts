import prisma from 'api-lib/prisma';
import { parseAvailabilities } from 'api-lib/util/calendarStrength/parseAvailabilities';
import { ParsedAvailabilities } from 'api-lib/util/calendarStrength/types';

export const getAvailabilities = async (groupID: number) => {
  const availabilities = await prisma.availability.findMany({
    where: { groupID },
  });

  if (availabilities.length === 0) return [] as ParsedAvailabilities[];

  return parseAvailabilities(availabilities);
};
