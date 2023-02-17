import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/src/store/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await db.posts.all();

  res.status(200).json({ users });
}
