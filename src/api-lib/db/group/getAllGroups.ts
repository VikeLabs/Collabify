import prisma from 'api-lib/prisma';
import { Group } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';

interface GetAllGroupsResult {
  groups?: Group[];
  err?: ApiError;
}

type GetAllGroups = () => Promise<GetAllGroupsResult>;

export const getAllGroups: GetAllGroups = async () => {
  try {
    return { groups: await prisma.group.findMany() };
  } catch (e) {
    return { err: new ApiError(e, 500) };
  }
};
