import { useRouter } from 'next/router';
import { useState } from 'react';
import * as React from 'react';
import NewGame from '../Game/NewGame';
import Image from 'next/image';
import ResumeGame from '../Game/ResumeGame';

type ViewMode = 'INTRO' | 'NEW' | 'RESUME';

const StartSection: React.FC = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('INTRO');

  return (
    <div className="relative flex justify-center py-20">
      <Image
        className={'object-center object-cover pointer-events-none'}
        src="/space.jpg"
        layout={'fill'}
      />
      <div
        className={
          'relative place-self-center z-1 w-100 sm:w-10/12 lg:w-2/3 max-w-7xl'
        }
      >
        <div className="text-left w-full text-white">
          <h2 className="font-mono uppercase text-sm tracking-widest font-medium mb-2 inline-block border-b-2 border-red-500">
            Die Crew
          </h2>
          <h1 className="font-sans tracking-tight bg-clip-text text-5xl font-medium title-font mb-6">
            Das Logbuch
          </h1>

          <div className="bg-gray-200 rounded px-5 py-3 bg-opacity-20 w-2/3">
            {viewMode === 'NEW' ? (
              <NewGame />
            ) : viewMode === 'RESUME' ? (
              <ResumeGame />
            ) : (
              <>
                <p className="font-sans text-xl mb-10 w-2/3">
                  Du willst gemeinsam mit deiner Crew zum 9. Planeten reisen,
                  weißt aber nicht genau wie und wo du deine Reise am besten
                  dokumentieren kannst? Dann bist du hier beim Logbuch genau
                  richtig. Starte jetzt eine neue Reise oder setze deine
                  bisherige Reise weiter fort und dokumentiere deinen
                  Spielfortschritt!
                </p>{' '}
                <div className="flex">
                  <button
                    className="btn btn-primary mr-6"
                    onClick={() => setViewMode('NEW')}
                  >
                    Neues Spiel starten
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setViewMode('RESUME')}
                  >
                    Spiel fortsetzen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSection;
