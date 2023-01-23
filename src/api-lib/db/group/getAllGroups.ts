import prisma from 'api-lib/prisma';
import { Group } from '@prisma/client';

type GetAllGroups = () => Promise<Group[]>;

export const getAllGroups: GetAllGroups = async () => {
  return await prisma.group.findMany();
};
