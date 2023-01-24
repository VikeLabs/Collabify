import prisma from 'api-lib/prisma';
import bcrypt from 'bcrypt';
import { ApiError } from 'api-lib/util/apiError';

interface GroupAuthResult {
  matched?: boolean;
  err?: ApiError;
}

export const groupAuthentication = async (
  groupID: number,
  password: string
): Promise<GroupAuthResult> => {
  const group = await prisma.group
    .findUnique({ where: { id: groupID } })
    .then((group) => group);

  if (!group) return { err: new ApiError(`group not found: ${groupID}`, 404) };

  const hashed = group.password;
  return { matched: await bcrypt.compare(password, hashed) };
};
