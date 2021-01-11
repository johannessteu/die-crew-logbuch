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

// eslint-disable-next-line no-shadow
export enum SpecialNotesEnum {
  COMMANDER_DISTRIBUTION = 'Durch Abfrage werden die Aufträge einzeln nacheinander durch den Kommandanten an die gesamte Crew verteilt. Am Ende der Verteilung darf niemand zwei Aufträge mehr haben als ein anderes Crew-Mitglied. ',
  COMMANDER_DECISION = 'Durch Abfrage bestimmt der Kommandant ein anderes Crew-Mitglied, das alle Aufträge erfüllen muss. Alle Auftragskarten werden erst nach Ihrer Vergabe aufgedeckt. ',
  RADIO_HOLE = 'Funkloch! Kommuniziert eine Karte nach den normalen Regeln, aber platziert kein Funkplättchen darauf. ',
  RADIO_INTERFERENCE = 'Es gibt eine Störung des Funksystems. Die Kommunikation ist erst zu Beginn des xx. Stichs erlaubt. ',
}

export interface GameMissionInterface {
  id: number;
  taskCards: number;
  taskTokens: TaskTokenEnum[];
  note: string;
  taskNotes: SpecialNotesEnum[];
  radioInterferenceAfter?: number;
  specialRule?: boolean;
}
