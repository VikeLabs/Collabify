import { Group } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { ApiError } from 'api-lib/util/apiError';

interface GetGroupResult {
  group?: Group;
  error?: ApiError;
  token?: string;
}

type GetGroupByID = (id: number) => Promise<GetGroupResult>;

/** getGroupByID(id)
 * - Query db and find group with the matching `id`
 * - Deletes props: `group.privateToken` AND `group.password`
 * */
export const getGroupByID: GetGroupByID = async (id: number) => {
  const group = await prisma.group.findUnique({
    where: { id },
  });

  if (!group) {
    return { error: new ApiError(`group not found: ${id}`, 404) };
  }

  // get group `privateToken`
  let token: string;
  if (group.isPrivate) token = group.privateToken;
  /* NOTE: !!!The following delete statements are important!!!
   * If some refactoring is needed,
   * don't forget to delete `group.password` and `group.privateToken`
   * as we don't want to send these private information back
   * to the client. Regardless of `group.isPrivate`.
   * - Hal
   * */
  delete group.privateToken;
  delete group.password;

  return { group, token };
};
