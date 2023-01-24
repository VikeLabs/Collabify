import { NextApiRequest, NextApiResponse } from 'next';
import { getGroups } from 'api-lib/db/group';

// URL: `/api/groupCalendar/multiple?groupID=1&groupID=2&groupID=3&`
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    const { groupID } = req.query;

    /* parsing query string
     * if only one `groupID` is in the query string, the type is string
     * else the type is string[] */
    let groupIDs: number[];
    if (typeof groupID === 'string') {
      groupIDs = [parseInt(groupID as string)];
    } else {
      groupIDs = groupID.map((gr) => parseInt(gr));
    }

    const { groups, err } = await getGroups(groupIDs);
    if (err) {
      res.status(err.statusCode).end();
      return;
    }

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).end();
    console.log(error);
  }
};
