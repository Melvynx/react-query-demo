import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/src/store/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = JSON.parse(req.body);

    if (!name || !email) {
      res.status(400).json({ error: 'Missing name or email' });
      return;
    }

    const user = await db.users.add({ name, email });

    res.status(200).json({ user });
    return;
  }

  const users = await db.users.all();

  res.status(200).json({ users });
}
