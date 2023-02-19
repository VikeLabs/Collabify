import { Credentials } from 'blog/api/types';
import prisma from 'api-lib/prisma';
import { Admin } from '@prisma/client';

export class AdminModel {
  static async saveOne(user: Credentials) {
    return await prisma.admin.create({ data: user as unknown as Admin });
  }
}
