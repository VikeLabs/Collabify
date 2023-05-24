import prisma from 'api-lib/prisma';
import { Group, Prisma } from '@prisma/client';

export const getGroupsByTitle = async (title: string): Promise<Group[]> => {
  // building filter
  const filter: Prisma.GroupFindManyArgs = {};
  filter.where = { name: { contains: title } };
  filter.orderBy = { id: 'desc' };
  filter.select = {
    id: true,
    isPrivate: true,
    name: true,
    description: true,
    icon: true,
  };

  return prisma.group.findMany(filter);
};
