import { useRouter } from 'next/router';
import { useState } from 'react';
import * as React from 'react';

const ResumeGame: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [gameIdentifier, setGameIdentifier] = useState('');

  const { notfound } = router.query;

  const handleResume = () => {
    setLoading(true);
    router.push({ pathname: '/spiel/[game]', query: { game: gameIdentifier } });
  };

  return (
    <>
      {notfound === '1' && (
        <div className="mt-2 text-white shadow cursor-pointer px-4 py-4 border-0 rounded relative mb-4 bg-red-500 flex">
          <span className="text-xl inline-block mr-3 align-middle">
            <svg
              className="fill-current h-6 w-6 text-teal-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </span>
          <span className="inline-block align-middle mr-8 text-lg">
            Deine Spiel-ID konnte nicht gefunden werden
          </span>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-end md:mb-4">
        <div className="md:flex-grow flex items-stretch flex-col mb: mr-3">
          <label htmlFor="gameId" className="block font-mono mb-2 text-md">
            Gib deine Spiel-ID ein
          </label>
          <input
            id="gameId"
            placeholder="AR2130"
            className="inp mb-4 flex-grow md:mb-0"
            value={gameIdentifier}
            onChange={(e) => setGameIdentifier(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary flex"
          onClick={handleResume}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {loading ? 'Spiel wird geladen' : 'Weiter spielen'}
        </button>
      </div>
    </>
  );
};

export default ResumeGame;
