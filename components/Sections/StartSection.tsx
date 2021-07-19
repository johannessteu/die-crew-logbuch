import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NewGame from '../Game/NewGame';
import ResumeGame from '../Game/ResumeGame';
import TransparentBox from '../TransparentBox';
import HeroSection from './HeroSection';

type ViewMode = 'INTRO' | 'NEW' | 'RESUME';

const StartSection: React.FC = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('INTRO');

  useEffect(() => {
    const { notfound } = router.query;
    if (notfound === '1') {
      setViewMode('RESUME');
    }
  }, [router.query]);

  return (
    <HeroSection>
      <div className="text-left w-full text-white">
        <h1 className="heroHeadline">
          <span className="font-mono uppercase text-sm tracking-widest font-medium mb-2 inline-block border-b-2 border-red-500">
            Die Crew
          </span>
          <span className="block">Das digitale Logbuch</span>
        </h1>

        <TransparentBox className="md:w-10/12 xl:w-2/3 max-w-2xl">
          {viewMode === 'NEW' ? (
            <NewGame />
          ) : viewMode === 'RESUME' ? (
            <ResumeGame />
          ) : (
            <>
              <p className="font-sans text-lg mb-10 md:max-w-lg xl:max-w-xl">
                Dich hat das Kennerspiel des Jahres 2020 gepackt und nun
                möchtest du mit deiner Crew zum 9. Planeten reisen, weißt aber
                nicht genau wie und wo du deine Reise am besten dokumentieren
                kannst? Das Dann bist du hier beim Logbuch genau richtig. Starte
                jetzt eine neue Reise oder setze deine bisherige Reise weiter
                fort!
              </p>
              <div className="flex flex-col md:flex-row">
                <button
                  type="button"
                  className="btn btn-primary mb-2  md:mr-6 md:mb-0"
                  onClick={() => setViewMode('NEW')}
                >
                  Neues Spiel starten
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewMode('RESUME')}
                >
                  Spiel fortsetzen
                </button>
              </div>
            </>
          )}
        </TransparentBox>
      </div>
    </HeroSection>
  );
};

export default StartSection;
