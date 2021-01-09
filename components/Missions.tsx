import * as React from 'react';
import { useEffect, useState } from 'react';
import { useCrewGame } from '../hooks/useCrewGame';
import { getTokenElement, toTimeString } from '../utils/helper';

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
            Erfolgreich <span className="hidden xl:inline">abgeschlossen</span>
          </button>
          <button
            type="button"
            onClick={() =>
              action({ type: 'RETRY_MISSION', payload: { mission: id } })
            }
            className="btn btn-primary btn-small bg-red-400 w-11/12 m-auto"
          >
            Fehlgeschlagen
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() =>
            action({ type: 'START_MISSION', payload: { mission: id } })
          }
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
    gameMissions,
    action,
  } = useCrewGame();

  const thisMission = missions.find((m) => m.mission === id);
  const gameMission = gameMissions.find((g) => g.id === id);

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
                <div className="flex items-center mr-4 md:mr-9 w-12">
                  <div className="bg-white p-1 inline-block rounded border border-gray-300 mr-2">
                    <svg
                      className="w-5 h-5"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                  </div>{' '}
                  {thisMission.trials}
                </div>

                <div className="items-center md:w-28 hidden md:flex">
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
                  {toTimeString(thisMission.took / 1000)}
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
                    <div className="bg-blue-700 p-1 w-14 h-18 rounded text-center">
                      <div className="bg-blue-700 text-white ring-2 ring-white ring-inset p-3 rounded h-full">
                        <span className="font-mono text-2xl ">
                          {gameMission.taskCards}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="mb-1 inline-block uppercase">
                      Auftragsplättchen
                    </span>

                    <div className="flex flex-wrap">
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
                <p>{gameMission.note || 'keine'}</p>
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

            {active && <ActiveMission id={id} />}
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
