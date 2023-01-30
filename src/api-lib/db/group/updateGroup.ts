import { Group } from '@prisma/client';
import prisma from 'api-lib/prisma';
import { ApiError } from 'api-lib/util/apiError';
import bcrypt from 'bcrypt';

export const updateGroup = async (
  data: Group,
  groupID: number
): Promise<ApiError | null> => {
  try {
    const saltRounds = 10;

    data.password = await bcrypt.hash(data.password, saltRounds);

    await prisma.group.update({ where: { id: groupID }, data });

    return;
  } catch (e) {
    return new ApiError(e, 404);
  }
};
