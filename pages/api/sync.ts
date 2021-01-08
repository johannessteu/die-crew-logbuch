import { NextApiRequest, NextApiResponse } from 'next';
import { GameInterface } from '../../interfaces';
import db from '../../utils/firestoreDb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const gamesRef = await db.collection('games');

  const game: GameInterface = req.body;
  await gamesRef.doc(game.identifier).update(game);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: true }));
};
