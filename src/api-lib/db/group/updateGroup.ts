import prisma from 'api-lib/prisma';
import { Group } from '@prisma/client';
import { ApiError } from 'api-lib/util/apiError';

interface UpdateGroupProp {
  id: number;
  data: Group;
}

type UpdateGroup = (prop: UpdateGroupProp) => Promise<ApiError | undefined>;

export const updateGroup: UpdateGroup = async ({ data, id }) => {
  try {
    await prisma.group.update({
      where: { id },
      data,
    });
    return;
  } catch (e) {
    return new ApiError(e, 500);
  }
};
