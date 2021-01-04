import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { GameInterface } from '../../interfaces/game';
import db from '../../utils/firestoreDb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const gamesRef = await db.collection('games');
  const identifier = generateRandomGameIdentifier();

  const {
    query: { attendees },
  } = req;

  const gameData: GameInterface = {
    identifier,
    player: attendees as string[],
    currentMission: 1,
    missions: [
      {
        mission: 1,
        trials: 1,
        success: false,
        note: '',
        startedAt: new Date().getTime(),
        finishedAt: null,
      },
    ],
  };

  gamesRef.doc(identifier).set(gameData);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: true, identifier }));
};

const generateRandomGameIdentifier = (): string => {
  let identifier = '';
  const leadingCharCount = 2;
  const leadingChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (var i = 0; i < leadingCharCount; i++) {
    identifier += leadingChars.charAt(
      Math.floor(Math.random() * leadingChars.length)
    );
  }

  return identifier + Math.floor(Math.random() * Math.floor(9999));
};
