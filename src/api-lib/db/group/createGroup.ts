import { Group } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { ApiError } from 'api-lib/util/apiError';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

interface CreateGroupResult {
  group?: Group;
  error?: ApiError;
}

type CreateGroup = (group: Group) => Promise<CreateGroupResult>;

/** createGroup(group)
 * - Creates group, if a group is private:
 *   - hashes then saves it as `group.password`
 *   - generate a uuid for `group.privateToken`
 * */
export const createGroup: CreateGroup = async (group: Group) => {
  if (group.isPrivate) {
    if (!group.password || group.password === '') {
      const error = new ApiError(
        `no password provided for private group: ${group}`,
        400
      );

      return { error };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(group.password, saltRounds);
    group.password = hashedPassword;
    group.privateToken = uuidv4();
  }

  const newGroup = await prisma.group
    .create({ data: group })
    .then((group) => group);

  return { group: newGroup };
};
