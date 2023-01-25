import prisma from 'api-lib/prisma';
import { Group } from '@prisma/client';

type GetAllGroups = () => Promise<Group[]>;

export const getAllGroups: GetAllGroups = async () => {
  const allGroups = await prisma.group.findMany();

  return allGroups.map((group) => {
    delete group.privateToken; // !IMPORTANT
    delete group.password; // !IMPORTANT
    delete group.calendarMaxTime;
    delete group.calendarMinTime;
    return group;
  });
};
