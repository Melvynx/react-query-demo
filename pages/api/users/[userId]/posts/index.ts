import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/src/store/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId;

  if (!userId) {
    res.status(400).json({ error: 'Missing user id' });
    return;
  }

  const posts = await db.posts.byUserId(Number(userId));

  res.status(200).json({ posts });
}
