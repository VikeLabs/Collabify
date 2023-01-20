import { Group } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { ApiError } from 'api-lib/util/apiError';

interface GetGroupResult {
  group?: Group;
  error?: ApiError;
}

export const getGroupByID = async (id: number): Promise<GetGroupResult> => {
  const group = await prisma.group.findUnique({
    where: { id },
  });

  if (!group) {
    return { error: new ApiError(`group not found: ${id}`, 404) };
  }

  return { group };
};
