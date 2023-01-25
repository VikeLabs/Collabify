import { Group, Prisma } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { ApiError } from 'api-lib/util/apiError';

interface GetGroupResult {
  group?: Group;
  error?: ApiError;
  token?: string;
}

type GetGroupByID = (id: number) => Promise<GetGroupResult>;

export const getGroupByID: GetGroupByID = async (id: number) => {
  // filter
  const filter = {} as Prisma.GroupFindUniqueArgs;
  filter.where = { id };
  filter.select = {
    name: true,
    id: true,
    icon: true,
    isPrivate: true,
    privateToken: true, // IMPORTANT: since we need to return the `privateToken`, reminder to delete before return group
    description: true,
    calendarMaxTime: true,
    calendarMinTime: true,
  };

  // query
  const group = await prisma.group.findUnique(filter);

  if (!group) {
    return { error: new ApiError(`group not found: ${id}`, 404) };
  }

  // get group `privateToken`
  let token: string | undefined;
  if (group.isPrivate) token = group.privateToken;
  delete group.privateToken; // IMPORTANT: group will be sent back to the client, delete private information

  return { group, token };
};
