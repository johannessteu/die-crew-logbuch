export interface MissionInterface {
  mission: number;
  trials: number;
  success: boolean;
  note: string;
  startedAt: number;
  finishedAt: number | null;
}

export interface GameInterface {
  identifier: string;
  crewName: string;
  player: string[];
  currentMission: number;
  missions: MissionInterface[];
}
