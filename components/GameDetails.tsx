import * as React from 'react';
import { useCrewGame } from '../hooks/useCrewGame';
import { toTimeString } from '../utils/helper';
import TransparentBox from './TransparentBox';

const GameDetails: React.FC = () => {
  const { game } = useCrewGame();

  const time = game.missions.reduce((acc, mission) => {
    return acc + mission.took;
  }, 0);

  return (
    <div className="flex flex-col md:flex-row md:justify-between">
      <TransparentBox>
        <h3>Crewmitglieder</h3>
        {game.player.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </TransparentBox>
      <TransparentBox>
        <h3>Spielstand</h3>
        Aktuelle Mission: {game.currentMission}
        <br />
        Gesamte Spielzeit: {toTimeString(Math.ceil(time / 1000))}
      </TransparentBox>
      <TransparentBox>
        <h3>Deine Spiel-ID</h3>
        {game.identifier}
      </TransparentBox>
    </div>
  );
};

export default GameDetails;
