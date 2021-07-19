import * as React from 'react';

import { useCrewGame } from '../hooks/useCrewGame';
import { toTimeString } from '../utils/helper';
import { MissionCard } from './Missions';

const GameDetails: React.FC = () => {
  const { game } = useCrewGame();

  const time = game.missions.reduce((acc, mission) => {
    return acc + mission.took / 1000;
  }, 0);

  return (
    <div className="flex flex-col md:flex-row md:justify-between bg-gray-200 rounded p-8 bg-opacity-20">
      <div className="mb-8">
        <h3 className="font-mono uppercase border-red-500 border-b mb-5">
          Crewmitglieder
        </h3>
        <ul>
          {game.player.map((p) => (
            <li className="mt-1 font-md" key={p}>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="font-mono uppercase border-red-500 border-b mb-5">
          Spielstand
        </h3>
        <div className="flex">
          <MissionCard special={false}>{game.currentMission}</MissionCard>
          <div className="ml-6">
            <p>{`Du hast bisher <br /> ${toTimeString(time)} gespielt`}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-mono uppercase border-red-500 border-b mb-5">
          Deine Spiel-ID
        </h3>
        <p className="text-lg">{game.identifier}</p>
      </div>
    </div>
  );
};

export default GameDetails;
