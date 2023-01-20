import prisma from 'api-lib/prisma';
import { Group } from 'api-lib/model';
import { ApiError } from 'api-lib/util/apiError';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const createGroup = async (group: Group): Promise<number> => {
  try {
    if (group.isPrivate) {
      if (!group.password || group.password === '') {
        throw new ApiError(
          `no password provided for private group: ${group}`,
          400
        );
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(group.password, saltRounds);
      group.password = hashedPassword;
      group.privateToken = uuidv4();
    }

    const groupID = prisma.group
      .create({ data: group })
      .then((record) => record.id);
    return groupID;
  } catch (e) {
    console.log(e);
    if (!(e instanceof ApiError)) {
      throw new ApiError(e, 500);
    }
  }
};
