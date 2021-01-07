export interface MissionPlayedInterface {
  mission: number;
  trials: number;
  success: boolean;
  note: string;
  distressSignalUsed: boolean;
  startedAt: number | null;
  finishedAt: number | null;
  took: number | null;
}

export interface GameInterface {
  identifier: string;
  crewName: string;
  player: string[];
  currentMission: number;
  missions: MissionPlayedInterface[];
}

// eslint-disable-next-line no-shadow
export enum TaskTokenEnum {
  TOKEN_FIRST = 'TOKEN_FIRST',
  TOKEN_SECOND = 'TOKEN_SECOND',
  TOKEN_THIRD = 'TOKEN_THIRD',
  TOKEN_FOURTH = 'TOKEN_FOURTH',
  TOKEN_FIFTH = 'TOKEN_FIFTH',
  TOKEN_LAST = 'TOKEN_LAST',
  TOKEN_BEFORE_1 = 'TOKEN_BEFORE_1',
  TOKEN_BEFORE_2 = 'TOKEN_BEFORE_2',
  TOKEN_BEFORE_3 = 'TOKEN_BEFORE_3',
  TOKEN_BEFORE_4 = 'TOKEN_BEFORE_4',
}

export interface GameMissionInterface {
  id: number;
  taskCards: number;
  taskTokens: TaskTokenEnum[];
  note: string;
}
