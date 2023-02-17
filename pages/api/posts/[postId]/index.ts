import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/src/store/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.postId;

  if (!postId) {
    res.status(400).json({ error: 'Missing user id' });
    return;
  }

  const post = await db.posts.byId(Number(postId));

  res.status(200).json({ post });
}
