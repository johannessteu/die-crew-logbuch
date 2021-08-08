import { NextApiRequest, NextApiResponse } from 'next';

import { GameInterface, GameType } from '../../interfaces';
import db from '../../utils/firestoreDb';

const generateRandomGameIdentifier = (): string => {
  let identifier = '';
  const leadingCharCount = 2;
  const leadingChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < leadingCharCount; i++) {
    identifier += leadingChars.charAt(
      Math.floor(Math.random() * leadingChars.length)
    );
  }

  return identifier + Math.floor(Math.random() * Math.floor(9999));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const gamesRef = await db.collection('games');
  const identifier = generateRandomGameIdentifier();

  const {
    query: { attendees, crewName, type },
  } = req;

  const gameData: GameInterface = {
    identifier,
    crewName: crewName as string,
    type: type as GameType,
    player: attendees.toString().split(','),
    currentMission: 1,
    missions: [
      {
        mission: 1,
        distressSignalUsed: false,
        trials: 0,
        success: false,
        note: '',
        took: null,
        startedAt: null,
        finishedAt: null,
      },
    ],
  };

  await gamesRef.doc(identifier).set(gameData);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: true, identifier }));
};
