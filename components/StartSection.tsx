import { useRouter } from 'next/router';
import { useState } from 'react';
import * as React from 'react';
import NewGame from './Game/NewGame';
import Section from './Section';

const StartSection: React.FC = ({ children }) => {
  const router = useRouter();
  const [gameIdentifier, setGameIdentifier] = useState('');
  const [showNewGameForm, setShowNewGameForm] = useState(false);

  if (showNewGameForm) {
    return <NewGame />;
  }

  return (
    <Section bg={'white'}>
      <h1>Starte ein neues Spiel</h1>
      <div className="flex items-center flex-col w-1/2">
        <div className="flex my-7">
          <input
            placeholder="Beispiel: AB7246"
            className="inp"
            value={gameIdentifier}
            onChange={(e) => setGameIdentifier(e.target.value)}
          />
          <button
            className="btn btn-secondary ml-4 "
            onClick={() =>
              router.push({
                pathname: '/spiel/[game]',
                query: { game: gameIdentifier },
              })
            }
          >
            Spiel fortsetzen
          </button>
        </div>
        oder
        <button
          className="btn btn-primary"
          onClick={() => setShowNewGameForm(true)}
        >
          Neues Spiel starten
        </button>
      </div>
    </Section>
  );
};

export default StartSection;
