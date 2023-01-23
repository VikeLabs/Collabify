import prisma from 'api-lib/prisma';
import { Group } from '@prisma/client';

type GetManyGroups = (groupIDs: number[]) => Promise<Group[]>;

export const getManyGroups: GetManyGroups = async (groupIDs: number[]) => {
  const groups = await prisma.group.findMany({
    where: {
      id: { in: groupIDs },
    },
  });

  return groups;
};
