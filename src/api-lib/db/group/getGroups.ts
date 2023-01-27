import prisma from 'api-lib/prisma';
import { Group, Prisma } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';

interface GetGroupsResult {
  err?: ApiError;
  groups?: Group[];
}

export const getGroups = async (
  groupIDs?: number[]
): Promise<GetGroupsResult> => {
  // building filter
  const filter: Prisma.GroupFindManyArgs = {};
  if (groupIDs) filter.where = { id: { in: groupIDs } };
  filter.orderBy = { id: 'desc' };
  filter.select = {
    id: true,
    isPrivate: true,
    name: true,
    description: true,
    icon: true,
  };

  // query
  let groups = await prisma.group.findMany(filter);
  if (groups.length === 0) return { err: new ApiError(null, 204) };

  return { groups };
};
