import prisma from 'api-lib/prisma';
import { Group } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';

interface GetGroupsResult {
  err?: ApiError;
  groups?: Group[];
}

export const getGroups = async (
  groupIDs?: number[]
): Promise<GetGroupsResult> => {
  const filter = groupIDs ? { where: { id: { in: groupIDs } } } : null;

  let groups = await prisma.group.findMany(filter);
  if (groups.length === 0) return { err: new ApiError(null, 204) };

  return {
    groups: groups.map((group) => {
      delete group.privateToken; // !IMPORTANT
      delete group.password; // !IMPORTANT
      delete group.calendarMaxTime;
      delete group.calendarMinTime;
      return group;
    }),
  };
};
