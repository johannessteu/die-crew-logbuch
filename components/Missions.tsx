import { useEffect, useState } from 'react';
import * as React from 'react';
import { useCrewGame } from '../hooks/useCrewGame';
import { MissionPlayedInterface } from '../interfaces';
import { toTimeString } from '../utils/helper';

const Icon = () => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);

const MissionStats: React.FC<{ mission: MissionPlayedInterface }> = ({
  mission,
}) => {
  return (
    <>
      <div>Versuche - {mission.trials}</div>
      <div>Dauer - {toTimeString(mission.took / 1000)}</div>
    </>
  );
};

const ActiveMission: React.FC<{ id: number }> = ({ id }) => {
  const {
    game: { missions },
    action,
  } = useCrewGame();

  const activeMission = missions.find((m) => m.mission === id);

  // A mission is considered as started if it is
  //  - the active Mission
  //  - has a startedAt set
  // - startedAt is not older than 4 hours (60 * 60 * 4 * 1000)
  const started =
    activeMission && activeMission.startedAt > Date.now() - 14400000;

  return (
    <div>
      <MissionStats mission={activeMission} />
      {started ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              action({
                type: 'FINISH_MISSION',
                payload: {
                  mission: id,
                  distressSignalUsed: false,
                  note: 'Test',
                },
              })
            }
            className="btn btn-primary btn-small bg-green-400 mr-3"
          >
            Erfolgreich abgeschlossen
          </button>
          <button
            type="button"
            onClick={() =>
              action({ type: 'RETRY_MISSION', payload: { mission: id } })
            }
            className="btn btn-primary btn-small bg-red-400"
          >
            Fehlgeschlagen
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() =>
            action({ type: 'START_MISSION', payload: { mission: id } })
          }
          className="btn btn-primary btn-small"
        >
          Mission starten
        </button>
      )}
    </div>
  );
};

const Mission: React.FC<{
  id: number;
  active: boolean;
  isLast: boolean;
  isFirst: boolean;
}> = ({ id, isFirst, isLast, active }) => {
  const [collapsed, setCollapsed] = useState(!active);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  const {
    game: { missions },
  } = useCrewGame();

  const thisMission = missions.find((m) => m.mission === id);

  useEffect(() => {
    setCollapsed(!active);
    setAlreadyPlayed(
      !active && missions.find((m) => m.mission === id) !== undefined
    );
  }, [active, id, missions]);

  return (
    <div className="flex relative pb-12">
      <div
        className={`w-10 absolute inset-0 flex items-center justify-center ${
          isLast ? 'h-2' : 'h-full'
        } ${isFirst && 'top-2'}`}
      >
        <div className=" h-full w-1 bg-gray-200 pointer-events-none" />
      </div>
      <div
        className={`flex-shrink-0 w-10 top-2 mr-3 h-10 rounded-full inline-flex items-center justify-center  text-white relative z-10 
        ${
          alreadyPlayed
            ? 'bg-green-700'
            : active
            ? 'bg-yellow-300'
            : 'bg-gray-200'
        }`}
      >
        <Icon />
      </div>
      <div className="flex-grow  shadow bg-gray-100 rounded p-4 h-full items-center flex flex-col justify-between">
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="flex flex-row w-full justify-between cursor-pointer"
        >
          <h3 className="font-mono uppercase text-sm tracking-widest font-medium inline-block">
            Mission {id}
          </h3>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-6 h-6 transform ${
              collapsed ? 'rotate-90' : '-rotate-90'
            }`}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        {!collapsed && (
          <div className="w-full">
            {active && <ActiveMission id={id} />}
            {alreadyPlayed && <MissionStats mission={thisMission} />}
          </div>
        )}
      </div>
    </div>
  );
};

const Missions: React.FC = () => {
  const {
    gameMissions,
    game: { currentMission },
  } = useCrewGame();

  return (
    <div className="flex flex-col w-full">
      {gameMissions.map((m, idx) => (
        <Mission
          key={m.id}
          id={m.id}
          active={m.id === currentMission}
          isFirst={idx === 0}
          isLast={idx + 1 === gameMissions.length}
        />
      ))}
    </div>
  );
};

export default Missions;
