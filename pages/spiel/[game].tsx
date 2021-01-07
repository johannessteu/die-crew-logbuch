import { GetServerSideProps } from 'next';
import { createContext, useEffect, useState } from 'react';
import * as React from 'react';
import CopyNotice from '../../components/CopyNotice';
import GameDetails from '../../components/GameDetails';
import Missions from '../../components/Missions';
import HeroSection from '../../components/Sections/HeroSection';
import Section from '../../components/Sections/Section';
import { CrewGameProvider } from '../../hooks/useCrewGame';
import useLocalStorage from '../../hooks/useLocalStorage';
import { GameInterface, GameMissionInterface } from '../../interfaces';
import { missions } from '../../missions';
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

  useEffect(() => {
    setShowNotice(!confirmed);
  }, [confirmed]);

  return (
    <CrewGameProvider game={game} gameMissions={gameMissions}>
      <HeroSection>
        <h2 className="font-mono uppercase text-sm tracking-widest font-medium mb-2 inline-block border-b-2 border-red-500">
          Deine Crew
        </h2>
        <h1 className="heroHeadline">{game.crewName}</h1>
        <GameDetails />
      </HeroSection>

      <Section bg="white">
        <div className="px-4 sm:p-0">
          {showNotice && game.currentMission < 5 && (
            <CopyNotice onConfirm={() => setConfirmation(true)} />
          )}
          <Missions />
        </div>
      </Section>
    </CrewGameProvider>
  );
};

export const getServerSideProps: GetServerSideProps<GamePageInterface> = async ({
  res,
  query,
}) => {
  const { game } = query;

  const docRef = firestoreDb.collection('games').doc(game as string);
  const doc = await docRef.get();

  if (!doc.exists) {
    res.writeHead(307, { Location: '/' });
  }

  return {
    props: {
      gameMissions: missions,
      game: doc.data() as GameInterface,
    },
  };
};

export default GamePage;
