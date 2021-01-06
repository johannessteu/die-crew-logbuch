import { useRouter } from 'next/router';
import { useState } from 'react';
import * as React from 'react';

const ResumeGame: React.FC = ({ children }) => {
  const router = useRouter();
  const [gameIdentifier, setGameIdentifier] = useState('');

  const handleResume = () => {
    router.push({ pathname: '/spiel/[game]', query: { game: gameIdentifier } });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end md:mb-4">
      <div className="md:flex-grow flex items-stretch flex-col mb: mr-3">
        <label className="block font-mono mb-2 text-md">
          Gib deine Spiel-ID ein
        </label>
        <input
          placeholder="AR2130"
          className="inp mb-4 flex-grow md:mb-0"
          value={gameIdentifier}
          onChange={(e) => setGameIdentifier(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleResume}>
        Weiter spielen
      </button>
    </div>
  );
};

export default ResumeGame;
