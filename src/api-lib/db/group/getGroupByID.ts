import { Group } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { ApiError } from 'api-lib/util/apiError';

interface GetGroupResult {
  group?: Group;
  error?: ApiError;
}

type GetGroupByID = (id: number) => Promise<GetGroupResult>;

export const getGroupByID: GetGroupByID = async (id: number) => {
  const group = await prisma.group.findUnique({
    where: { id },
  });

  if (!group) {
    return { error: new ApiError(`group not found: ${id}`, 404) };
  }

  return { group };
};
