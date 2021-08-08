import * as React from 'react';

import { GameType } from '../../interfaces';

const ChooseGame: React.FC<{
  onChoose: (type: GameType) => void;
  onSelect: (type: GameType) => void;
}> = ({ onChoose, onSelect }) => {
  const [type, setType] = React.useState<GameType>('space');

  const cardClassNames = 'bg-white rounded text-black p-3 cursor-pointer';

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex flex-row justify-center">
        <div
          onClick={() => {
            setType('space');
            onSelect('space');
          }}
          className={`${cardClassNames} mr-3 ${
            type === 'space' && 'ring-4 ring-blue-600'
          }`}
        >
          Mission 9. Planet
        </div>
        <div
          onClick={() => {
            setType('deepSea');
            onSelect('deepSea');
          }}
          className={`${cardClassNames} mr-3 ${
            type === 'deepSea' && 'ring-4 ring-blue-600'
          }`}
        >
          Mission Tiefsee
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary w-auto"
        onClick={() => onChoose(type)}
      >
        {type === 'deepSea' ? 'Auf in die Tiefsee' : 'Auf zum 9. Planeten'}
      </button>
    </div>
  );
};

export default ChooseGame;
