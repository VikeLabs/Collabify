import prisma from 'api-lib/prisma';
import { Group } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';

interface GetManyGroupsResult {
  groups?: Group[];
  err?: ApiError;
}

type GetManyGroups = (groupIDs: number[]) => Promise<GetManyGroupsResult>;

export const getManyGroups: GetManyGroups = async (groupIDs: number[]) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        id: { in: groupIDs },
      },
    });

    return { groups };
  } catch (e) {
    return { err: new ApiError(e, 500) };
  }
};
