import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  console.log('Prisma connected on PROD!')
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    console.log('Prisma connect on DEV')
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
