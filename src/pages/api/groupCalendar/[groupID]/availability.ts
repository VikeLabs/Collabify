import prisma from 'api-lib/prisma';
import { Availability } from '@prisma/client';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { body } = req;
  const groupID = parseInt(req.query.groupID as string);
  try {
    const availability: Availability = body;
    availability.groupID = groupID;

    await prisma.availability.create({ data: availability });

    res.status(201).end();
  } catch (error) {
    res.status(500).end();
    console.log(error);
  }
}
