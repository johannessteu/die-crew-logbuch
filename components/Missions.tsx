/* eslint-disable no-plusplus */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useCrewGame } from '../hooks/useCrewGame';
import {
  getSpecialMissionNotes,
  getTokenElement,
  toTimeString,
} from '../utils/helper';

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

export const MissionCard: React.FC<{ special: boolean }> = ({
  special,
  children,
}) => (
  <div className="bg-blue-700 p-1 w-16 h-18 rounded text-center">
    <div
      className={`bg-blue-700 text-white ring-inset p-3 rounded h-full ${
        special ? 'ring-4 ring-yellow-400' : 'ring-2 ring-white'
      }`}
    >
      <span className="font-mono text-2xl ">{children}</span>
    </div>
  </div>
);

const MissionNotes: React.FC<{
  note: string;
  onSave: (notes: string) => void;
}> = ({ note, onSave }) => {
  const [notesInput, setNotesInput] = useState(note);

  const isDirty = notesInput !== note;

  return (
    <div className="text-right">
      <textarea
        rows={7}
        onChange={(e) => setNotesInput(e.target.value)}
        className="p-3 rounded w-full"
        value={notesInput}
      />

      {isDirty && (
        <button
          onClick={() => onSave(notesInput)}
          type="submit"
          className="btn"
        >
          Speichern
        </button>
      )}
    </div>
  );
};

const ActiveMission: React.FC<{ id: number; onRetry: () => void }> = ({
  id,
  onRetry,
}) => {
  const {
    game: { missions },
    action,
    settings: { enableAutostart, disableAutostart, autostart },
  } = useCrewGame();
  const [restartMission, setRestartMission] = useState(false);
  const [counter, setCounter] = useState(0);

  const activeMission = missions.find((m) => m.mission === id);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Set autostart timer and start the mission after 5 seconds
    if (autostart && activeMission.startedAt === null) {
      setCounter(5);
      const autostartTimeout = setTimeout(() => {
        action({ type: 'START_MISSION', payload: { mission: id } });
      }, 5000);

      return () => clearTimeout(autostartTimeout);
    }
  }, [action, activeMission.startedAt, autostart, id]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // update counter value
    if (counter > 0) {
      const counterTimeout = setTimeout(() => setCounter(counter - 1), 1000);

      return () => clearTimeout(counterTimeout);
    }
  }, [counter]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // restart the mission
    if (restartMission === true) {
      const restartTimeout = setTimeout(() => {
        setRestartMission(false);
      }, 3000);

      return () => clearTimeout(restartTimeout);
    }
  }, [restartMission]);

  // A mission is considered as started if it is
  //  - the active Mission
  //  - has a startedAt set
  // - startedAt is not older than 4 hours (60 * 60 * 4 * 1000)
  const started =
    activeMission && activeMission.startedAt > Date.now() - 14400000;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center mt-6 lg:w-4/5 md:mx-auto">
        {started ? (
          <>
            <button
              type="button"
              onClick={() =>
                action({
                  type: 'FINISH_MISSION',
                  payload: {
                    mission: id,
                    distressSignalUsed: false,
                  },
                })
              }
              className="btn btn-primary btn-small bg-green-700 w-11/12 m-auto mb-3 md:mb-0 md:mr-3"
            >
              Erfolgreich{' '}
              <span className="hidden xl:inline">abgeschlossen</span>
            </button>
            <button
              type="button"
              onClick={() => {
                action({ type: 'RETRY_MISSION', payload: { mission: id } });
                setRestartMission(true);
                onRetry();
              }}
              disabled={restartMission}
              className={`btn btn-primary btn-small w-11/12 m-auto flex justify-center ${
                restartMission ? 'bg-gray-600' : 'bg-red-400'
              }`}
            >
              {restartMission && (
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
              {restartMission ? 'Nächster Versuch!' : 'Fehlgeschlagen'}
            </button>
          </>
        ) : autostart ? (
          <div className="flex flex-col md:flex-row justify-center mt-6 lg:w-4/5 md:mx-auto">
            <button
              type="button"
              className="md:mr-3 mb-3 md:mb-0 btn btn-primary btn-small flex"
            >
              🚀 Mission startet in {counter}
            </button>
            <button
              onClick={() => {
                setCounter(0);
                disableAutostart();
              }}
              type="button"
              className="btn btn-secondary btn-small flex"
            >
              Automatischen Start abbrechen
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              action({ type: 'START_MISSION', payload: { mission: id } });
              enableAutostart();
            }}
            className="btn btn-primary btn-small flex"
          >
            <svg
              className="w-5 h-5 mr-2 text-white fill-current"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            Mission starten
          </button>
        )}
      </div>
      {started && (
        <span
          className="mt-4 block text-center text-gray-500 cursor-pointer"
          onClick={() => {
            disableAutostart();
            action({ type: 'CANCEL_MISSION', payload: { mission: id } });
          }}
        >
          Mission abbrechen
        </span>
      )}
    </>
  );
};

const Mission: React.FC<{
  id: number;
  active: boolean;
  isLast: boolean;
  isFirst: boolean;
}> = ({ id, isFirst, isLast, active }) => {
  const ref = useRef<HTMLDivElement>();
  const [collapsed, setCollapsed] = useState(!active);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [animatePing, setAnimatePing] = useState(false);
  const [playedTime, setPlayedTime] = useState(0);

  const {
    game: { missions },
    gameMissions,
    action,
  } = useCrewGame();

  const thisMission = missions.find((m) => m.mission === id);
  const gameMission = gameMissions.find((g) => g.id === id);

  useEffect(() => {
    // scroll active mission into view
    if (active) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [active]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (active && thisMission.startedAt) {
      setPlayedTime(Date.now() - thisMission.startedAt);

      const interval = setInterval(() => {
        setPlayedTime(Date.now() - thisMission.startedAt);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [active, thisMission]);

  useEffect(() => {
    setCollapsed(!active);
    setAlreadyPlayed(
      !active && missions.find((m) => m.mission === id) !== undefined
    );
  }, [active, id, missions]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (animatePing === true) {
      const timeout = setTimeout(() => {
        setAnimatePing(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [animatePing]);

  return (
    <div ref={ref} className="flex relative pb-12">
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
      <div className="flex-grow shadow bg-gray-100 rounded p-4 h-full items-center flex flex-col justify-between">
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="flex flex-row w-full justify-between cursor-pointer"
        >
          <h3 className="font-mono uppercase text-sm tracking-widest font-medium inline-block">
            Mission {id}
          </h3>
          <div className="flex">
            {thisMission && (
              <div className="flex md:2 md:mr-10">
                <div className="flex relative items-center mr-4 md:mr-9 w-12">
                  <div className="bg-white p-1 relative inline-block rounded border border-gray-300 mr-2">
                    <svg
                      className="w-5 h-5"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                  </div>{' '}
                  {animatePing && (
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-600 opacity-75" />
                  )}
                  {thisMission.trials}
                </div>

                <div className="items-center md:w-30 hidden md:flex">
                  <div className="bg-white p-1 inline-block rounded border border-gray-300 mr-2">
                    <svg
                      className="w-5 h-5"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                    </svg>
                  </div>
                  {active
                    ? playedTime < 60 * 1000
                      ? `${Math.round(playedTime / 1000)} Sekunden`
                      : toTimeString(playedTime / 1000)
                    : thisMission.took < 60 * 1000
                    ? `${Math.round(thisMission.took / 1000)} Sekunden`
                    : toTimeString(thisMission.took / 1000)}
                </div>
              </div>
            )}

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
        </div>
        {!collapsed && (
          <div className="w-full p-2 m-5 pb-0">
            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3 flex flex-col">
                <div className="flex flex-col md:flex-row">
                  <div className="mr-8 mb-8 ">
                    <span className="mb-1 inline-block uppercase">
                      Missionen
                    </span>
                    {gameMission.taskCards === 0 ? (
                      <p>Keine</p>
                    ) : (
                      <MissionCard special={gameMission.specialRule || false}>
                        {gameMission.taskCards}
                      </MissionCard>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="mb-1 inline-block uppercase">
                      Auftragsplättchen
                    </span>

                    <div className="flex flex-wrap">
                      {gameMission.taskTokens.length === 0 && <p>Keine</p>}
                      {gameMission.taskTokens.map((token) => (
                        <div
                          key={token}
                          className="bg-purple-700 mb-2 mr-2 p-1 w-14 h-18 rounded text-center"
                        >
                          <div className="bg-purple-700 text-white ring-2 ring-white h-14 ring-inset p-3 rounded">
                            {getTokenElement(token)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="inline-block mt-8 uppercase">
                  Zusätzliche Aufgabe:
                </span>
                {getSpecialMissionNotes(
                  gameMission.note,
                  gameMission.taskNotes,
                  gameMission.radioInterferenceAfter
                )}
              </div>
              <div className="w-full md:w-1/3 mt-4 md:mt-0">
                <span className="mb-1 inline-block uppercase">Notizen</span>
                {active && thisMission.startedAt !== null ? (
                  <MissionNotes
                    onSave={(note) =>
                      action({
                        type: 'ADD_NOTE',
                        payload: { mission: id, note },
                      })
                    }
                    note={thisMission.note}
                  />
                ) : (
                  <p>
                    {thisMission
                      ? thisMission.startedAt === null ||
                        thisMission.note === ''
                        ? 'keine'
                        : thisMission.note
                      : 'keine'}
                  </p>
                )}
              </div>
            </div>

            {active && (
              <ActiveMission onRetry={() => setAnimatePing(true)} id={id} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const MoreRow: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  return (
    <div className="flex relative -mt-12 p-2" onClick={handleClick}>
      <div className="w-10 absolute inset-0 flex items-center justify-center h-full">
        <div className=" h-full w-1 bg-gray-200 pointer-events-none" />
      </div>
      <div className="p-4 h-full w-1/2 mx-auto text-center cursor-pointer">
        <button
          type="button"
          className="btn border border-gray-400 hover:bg-blue-600 hover:translate-y-0.5 hover:text-white"
        >
          Weitere Missionen anzeigen
        </button>
      </div>
    </div>
  );
};

const Missions: React.FC = () => {
  const [missionsToRender, setMissionsToRender] = useState([1, 50]);

  const {
    gameMissions,
    game: { currentMission },
  } = useCrewGame();

  const handleAddMoreMissionsToRender = (newMissionIds: number[]) =>
    setMissionsToRender((prev) => {
      // we need to sort here so the last calculation is easy
      return Array.from(new Set([...prev, ...newMissionIds])).sort(
        (a, b) => a - b
      );
    });

  useEffect(() => {
    // force rerender after 5 played missions
    if (currentMission % 5 === 0) {
      const newMissionIds = [1, 50];
      for (let i = currentMission - 2; i < currentMission + 3; i++) {
        newMissionIds.push(i);
      }
      setMissionsToRender(newMissionIds);
    }
  }, [currentMission]);

  useEffect(() => {
    const newMissionIds = [];
    for (let i = currentMission - 2; i < currentMission + 3; i++) {
      newMissionIds.push(i);
    }

    handleAddMoreMissionsToRender(newMissionIds);
  }, [currentMission]);

  const handleShowMoreMissionsBefore = (id: number) => {
    const newMissionIds = [];
    for (let i = id - 4; i < id; i++) {
      if (i > 0) {
        newMissionIds.push(i);
      }
    }
    handleAddMoreMissionsToRender(newMissionIds);
  };

  const handleShowMoreMissionsAfter = (id: number) => {
    const newMissionIds = [];
    for (let i = id; i < id + 4; i++) {
      newMissionIds.push(i);
    }
    handleAddMoreMissionsToRender(newMissionIds);
  };

  return (
    <div className="flex flex-col w-full">
      {gameMissions
        .filter((g) => missionsToRender.indexOf(g.id) !== -1)
        .map((m, idx, self) => {
          const isFirst = idx === 0;
          const isLast = missionsToRender[missionsToRender.length - 1] === m.id;

          const renderPrevious = !isFirst && m.id - 1 > self[idx - 1].id;
          const renderNext = !isLast && m.id + 1 < self[idx + 1].id;

          return (
            <div key={`${m.id}mission`}>
              {!isLast && renderPrevious && (
                <MoreRow
                  handleClick={() => handleShowMoreMissionsBefore(m.id)}
                />
              )}
              <Mission
                id={m.id}
                active={m.id === currentMission}
                isFirst={isFirst}
                isLast={isLast}
              />
              {!isFirst && renderNext && (
                <MoreRow
                  handleClick={() => handleShowMoreMissionsAfter(m.id)}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Missions;
