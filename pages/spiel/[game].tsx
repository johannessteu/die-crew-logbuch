import * as React from 'react';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import CopyNotice from '../../components/CopyNotice';
import FeedbackBubble from '../../components/FeedbackBubble';
import GameDetails from '../../components/GameDetails';
import Missions from '../../components/Missions';
import HeroSection from '../../components/Sections/HeroSection';
import Section from '../../components/Sections/Section';
import { CrewGameProvider } from '../../hooks/useCrewGame';
import useLocalStorage from '../../hooks/useLocalStorage';
import { GameInterface, GameMissionInterface } from '../../interfaces';
import missions from '../../missions';
import firestoreDb from '../../utils/firestoreDb';

interface GamePageInterface {
  game: GameInterface;
  gameMissions: GameMissionInterface[];
}

const GamePage: React.FC<GamePageInterface> = ({ game, gameMissions }) => {
  const [showNotice, setShowNotice] = useState(false);
  const [confirmed, setConfirmation] = useLocalStorage<boolean>(
    `crew-${game.identifier}`,
    false
  );
  const [crewGames, setCrewGames] = useLocalStorage<
    { identifier: string; crew: string }[]
  >('crew-games', []);

  useEffect(() => {
    setShowNotice(!confirmed);

    if (!crewGames.find((e) => e.identifier === game.identifier)) {
      setCrewGames([
        ...crewGames,
        { identifier: game.identifier, crew: game.crewName },
      ]);
    }
  }, [confirmed, crewGames, game.crewName, game.identifier, setCrewGames]);

  return (
    <CrewGameProvider game={game} gameMissions={gameMissions}>
      <HeroSection background={game.type}>
        <h4 className="font-mono uppercase text-sm tracking-widest font-medium mb-2 inline-block border-b-2 border-red-500">
          Deine Crew
        </h4>
        <h1 className="heroHeadline mb-0">{game.crewName}</h1>
      </HeroSection>
      <Section bg="white">
        <GameDetails />
        {showNotice && game.currentMission < 5 && (
          <CopyNotice
            gameId={game.identifier}
            onConfirm={() => setConfirmation(true)}
          />
        )}
      </Section>
      <Section bg="white pt-0">
        <h3 className="heroHeadline px-4 sm:px-0">Logbuch</h3>
        <div className="px-4 sm:p-0">
          <Missions maxMissions={game.type === 'space' ? 50 : 32} />
        </div>
      </Section>
      <FeedbackBubble />
    </CrewGameProvider>
  );
};

export const getServerSideProps: GetServerSideProps<
  GamePageInterface
> = async ({ res, query }) => {
  const { game } = query;

  const docRef = firestoreDb.collection('games').doc(game as string);
  const doc = await docRef.get();

  if (!doc.exists) {
    res.writeHead(307, { Location: '/?notfound=1' });
    res.end();
  }

  const { type, ...rest } = doc.data();

  return {
    props: {
      gameMissions: missions.filter((m) => m.gameType === type),
      game: {
        ...rest,
        type: typeof type !== 'undefined' ? type : 'space',
      } as GameInterface,
    },
  };
};

export default GamePage;
