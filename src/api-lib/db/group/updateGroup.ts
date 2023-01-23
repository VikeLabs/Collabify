import prisma from 'api-lib/prisma';
import { Group } from '@prisma/client';

interface UpdateGroupProp {
  id: number;
  data: Group;
}

export const updateGroup = async ({ data, id }: UpdateGroupProp) => {
  await prisma.group.update({
    where: { id },
    data,
  });
  return;
};
