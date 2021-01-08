import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { GameInterface, GameMissionInterface } from '../interfaces';

interface ContextInterface {
  game: GameInterface;
  gameMissions: GameMissionInterface[];
  action: Dispatch<Action>;
}

const GameContext = createContext<ContextInterface | undefined>(undefined);

const useCrewGame = (): ContextInterface => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error('useGrewGame must be used within a CrewGameProvider');
  }

  return context;
};

type Action =
  | { type: 'START_MISSION'; payload: { mission: number } }
  | { type: 'RETRY_MISSION'; payload: { mission: number } }
  | { type: 'ADD_NOTE'; payload: { mission: number; note: string } }
  | {
      type: 'FINISH_MISSION';
      payload: { mission: number; distressSignalUsed: boolean };
    };

const reducer = (prev: GameInterface, action: Action): GameInterface => {
  const getOtherMissions = (toExclude: number) => {
    return prev.missions.filter((m) => m.mission !== toExclude);
  };

  const getMissionById = (id: number) =>
    prev.missions.find((m) => m.mission === id);

  const otherMissions = getOtherMissions(action.payload.mission);
  const currentMission = getMissionById(action.payload.mission);

  switch (action.type) {
    case 'START_MISSION':
      return {
        ...prev,
        missions: [
          ...otherMissions,
          {
            ...currentMission,
            trials: currentMission.trials + 1,
            startedAt: Date.now(),
          },
        ],
      };
    case 'RETRY_MISSION':
      return {
        ...prev,
        missions: [
          ...otherMissions,
          {
            ...currentMission,
            trials: currentMission.trials + 1,
          },
        ],
      };
    case 'FINISH_MISSION':
      return {
        ...prev,
        currentMission: action.payload.mission + 1,
        missions: [
          ...otherMissions,
          {
            ...currentMission,
            ...action.payload,
            finishedAt: Date.now(),
            took: Date.now() - currentMission.startedAt,
          },
          {
            trials: 0,
            distressSignalUsed: false,
            finishedAt: 0,
            startedAt: null,
            took: null,
            note: '',
            mission: action.payload.mission + 1,
            success: false,
          },
        ],
      };
    case 'ADD_NOTE':
      return {
        ...prev,
        missions: [
          ...otherMissions,
          {
            ...currentMission,
            note: action.payload.note,
          },
        ],
      };
    default:
      break;
  }

  return prev;
};

const CrewGameProvider: React.FC<{
  game: GameInterface;
  gameMissions: GameMissionInterface[];
}> = ({ children, game, gameMissions }) => {
  const [state, dispatch] = useReducer<
    Reducer<GameInterface, Action>,
    GameInterface
  >(reducer, game, undefined);

  useEffect(() => {
    const id = setTimeout(async () => {
      await fetch('/api/sync', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });
    }, 2000);

    return () => clearTimeout(id);
  }, [state]);

  return (
    <GameContext.Provider
      value={{ gameMissions, game: state, action: dispatch }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { CrewGameProvider, useCrewGame };
