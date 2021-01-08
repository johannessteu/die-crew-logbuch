import { GameMissionInterface, TaskTokenEnum } from './interfaces';

// Ihr befindet euch in einem Funkloch. Ihr dürft nur ohne Funkplättchen kommunizieren

export const missions: GameMissionInterface[] = [
  {
    id: 1,
    note: '',
    taskCards: 1,
    taskTokens: [],
  },
  {
    id: 2,
    note: '',
    taskCards: 2,
    taskTokens: [],
  },
  {
    id: 3,
    taskCards: 2,
    note: '',
    taskTokens: [TaskTokenEnum.TOKEN_FIRST, TaskTokenEnum.TOKEN_SECOND],
  },
  {
    id: 4,
    note: '',
    taskCards: 3,
    taskTokens: [],
  },
  {
    id: 5,
    note:
      'Der Kommandant fragt jedem nach seinem Befinden. Geantwortet mit "gut" oder "schlecht". Der Kommandant entscheidet wer krank ist. Diese Person darf keinen einzigen Stich gewinnen',
    taskCards: 0,
    taskTokens: [],
  },
  {
    id: 6,
    note: 'Funkloch: Ihr dürft nur ohne Funkplättchen kommunizieren',
    taskCards: 3,
    taskTokens: [TaskTokenEnum.TOKEN_BEFORE_1, TaskTokenEnum.TOKEN_BEFORE_2],
  },
  {
    id: 7,
    note: '',
    taskCards: 3,
    taskTokens: [TaskTokenEnum.TOKEN_LAST],
  },
  {
    id: 8,
    note: '',
    taskCards: 3,
    taskTokens: [
      TaskTokenEnum.TOKEN_FIRST,
      TaskTokenEnum.TOKEN_SECOND,
      TaskTokenEnum.TOKEN_THIRD,
    ],
  },
  {
    id: 9,
    note: 'Eine 1er Karte muss einen Stich gewinnen',
    taskCards: 1,
    taskTokens: [],
  },
  {
    id: 10,
    note: '',
    taskCards: 4,
    taskTokens: [],
  },
  {
    id: 11,
    note: 'Ein Crewmitglied kann nicht kommunizieren. Der Kommandant bestimmt',
    taskCards: 4,
    taskTokens: [TaskTokenEnum.TOKEN_FIRST],
  },
  {
    id: 12,
    note:
      'Nach dem 1. Stich muss jeder eine zufällige Karte des Crewmitglieds rechts von euch ziehen',
    taskCards: 4,
    taskTokens: [TaskTokenEnum.TOKEN_LAST],
  },
  {
    id: 13,
    note: 'Ihr müsst mit jeder Raketenkarte einen Stich gewinnen',
    taskCards: 0,
    taskTokens: [],
  },
  {
    id: 14,
    note: 'Funkloch: Ihr dürft nur ohne Funkplättchen kommunizieren',
    taskCards: 4,
    taskTokens: [
      TaskTokenEnum.TOKEN_BEFORE_1,
      TaskTokenEnum.TOKEN_BEFORE_2,
      TaskTokenEnum.TOKEN_BEFORE_3,
    ],
  },
  {
    id: 15,
    note: '',
    taskCards: 4,
    taskTokens: [
      TaskTokenEnum.TOKEN_FIRST,
      TaskTokenEnum.TOKEN_SECOND,
      TaskTokenEnum.TOKEN_THIRD,
      TaskTokenEnum.TOKEN_FOURTH,
    ],
  },
  {
    id: 16,
    note: 'Ihr dürft keinen Stich mit einer 9er Karte gewinnen',
    taskCards: 0,
    taskTokens: [],
  },
  {
    id: 17,
    note: '9er Karten gewinnen noch immer keinen Stich',
    taskCards: 2,
    taskTokens: [],
  },
  {
    id: 18,
    note: 'Ihr dürft erst ab dem 2. Stich kommunizieren',
    taskCards: 5,
    taskTokens: [],
  },
  {
    id: 19,
    note: 'Ihr dürft erst ab dem 3. Stick kommunizieren',
    taskCards: 5,
    taskTokens: [TaskTokenEnum.TOKEN_FIRST],
  },
  {
    id: 20,
    note: 'Der Kommandant bestimmt wer die Aufträge erhält',
    taskCards: 2,
    taskTokens: [],
  },
  {
    id: 21,
    note: 'Funkloch: Ihr dürft nur ohne Funkplättchen kommunizieren',
    taskCards: 5,
    taskTokens: [TaskTokenEnum.TOKEN_FIRST, TaskTokenEnum.TOKEN_SECOND],
  },
  {
    id: 22,
    note: '',
    taskCards: 5,
    taskTokens: [
      TaskTokenEnum.TOKEN_BEFORE_1,
      TaskTokenEnum.TOKEN_BEFORE_2,
      TaskTokenEnum.TOKEN_BEFORE_3,
      TaskTokenEnum.TOKEN_BEFORE_4,
    ],
  },
  {
    id: 23,
    note:
      'Bevor die Aufträge verteilt werden dürft ihr zwei Auftragsplättchen tauschen',
    taskCards: 5,
    taskTokens: [
      TaskTokenEnum.TOKEN_FIRST,
      TaskTokenEnum.TOKEN_SECOND,
      TaskTokenEnum.TOKEN_THIRD,
      TaskTokenEnum.TOKEN_FOURTH,
      TaskTokenEnum.TOKEN_FIFTH,
    ],
  },
  {
    id: 24,
    note: 'Der Kommandant verteilt die Aufträge',
    taskCards: 6,
    taskTokens: [],
  },
  {
    id: 25,
    note:
      'Funkloch: Ihr dürft nur ohne Funkplättchen kommunizieren. Spielt ihr zu fünft darf ab jetzt die Zusatzregel für 5 Crewmitglieder genutzt werden,',
    taskCards: 6,
    taskTokens: [TaskTokenEnum.TOKEN_BEFORE_1, TaskTokenEnum.TOKEN_BEFORE_2],
  },
  {
    id: 26,
    note: 'Zwei 1er Karten müssen einen Stich gewinnen',
    taskCards: 0,
    taskTokens: [],
  },
  {
    id: 27,
    note: 'Der Kommandant verteilt die Aufträge',
    taskCards: 3,
    taskTokens: [],
  },
  {
    id: 28,
    note: 'Ihr dürft erst ab dem 3. Stich kommunizieren',
    taskCards: 6,
    taskTokens: [],
  },
  {
    id: 29,
    note:
      'Zu keinen Zeitpunkt darf ein Crewmitgleid 2 Stiche mehr haben als ein anderes',
    taskCards: 0,
    taskTokens: [],
  },
  {
    id: 30,
    note: 'Ihr dürft erst ab dem 2. Stich kommunizieren',
    taskCards: 6,
    taskTokens: [
      TaskTokenEnum.TOKEN_BEFORE_1,
      TaskTokenEnum.TOKEN_BEFORE_2,
      TaskTokenEnum.TOKEN_BEFORE_3,
    ],
  },
  {
    id: 31,
    note: '',
    taskCards: 6,
    taskTokens: [
      TaskTokenEnum.TOKEN_FIRST,
      TaskTokenEnum.TOKEN_SECOND,
      TaskTokenEnum.TOKEN_THIRD,
    ],
  },
  {
    id: 32,
    note: 'Der Kommandant verteilt die Aufträge',
    taskCards: 7,
    taskTokens: [],
  },
  {
    id: 33,
    note:
      'Der Kommandant bestimmt eine Crewmitglied, dass genau einen Stich gewinnen muss - aber nicht mit einer Raketenkarte',
    taskCards: 1,
    taskTokens: [],
  },
  {
    id: 34,
    note:
      'Zu keinem Zeitpunkt darf ein Crewmitglied 2 Stiche mehr haben als ein anderes. Der Kommandant muss den ersten und den letzten Stich gewinnen',
    taskCards: 1,
    taskTokens: [],
  },
  {
    id: 35,
    note: '',
    taskCards: 7,
    taskTokens: [
      TaskTokenEnum.TOKEN_BEFORE_1,
      TaskTokenEnum.TOKEN_BEFORE_2,
      TaskTokenEnum.TOKEN_BEFORE_3,
    ],
  },
  {
    id: 36,
    note: 'Der Kommandant verteilt die Aufträge',
    taskCards: 7,
    taskTokens: [TaskTokenEnum.TOKEN_FIRST, TaskTokenEnum.TOKEN_SECOND],
  },
  {
    id: 37,
    note: 'Der Kommandant bestimmt, wer alle Aufträge erfüllen muss',
    taskCards: 4,
    taskTokens: [],
  },
  {
    id: 38,
    note: 'Ihr dürft erst ab dem 3. Stich kommunizieren',
    taskCards: 8,
    taskTokens: [],
  },
  {
    id: 39,
    note: 'Funkloch: Ihr dürft nur ohne Funkplättchen kommunizieren',
    taskCards: 8,
    taskTokens: [
      TaskTokenEnum.TOKEN_BEFORE_1,
      TaskTokenEnum.TOKEN_BEFORE_2,
      TaskTokenEnum.TOKEN_BEFORE_3,
    ],
  },
  {
    id: 40,
    note:
      'Bevor ihr beginnt die Aufträge zu verteilen dürft ihr ein Auftragsplättchen zu einer Misson ohne Auftrag legen',
    taskCards: 8,
    taskTokens: [
      TaskTokenEnum.TOKEN_FIRST,
      TaskTokenEnum.TOKEN_SECOND,
      TaskTokenEnum.TOKEN_THIRD,
    ],
  },
  {
    id: 41,
    note:
      'Der Kommandant bestimmt wer genau den ersten und den letzten Stich gewinnt. Hierfür darf das Crewmitglied keine Raketenkarte benutzen',
    taskCards: 0,
    taskTokens: [],
  },
  {
    id: 42,
    note: '',
    taskCards: 9,
    taskTokens: [],
  },
  {
    id: 43,
    note: 'Der Kommandant verteilt die Aufträge',
    taskCards: 9,
    taskTokens: [],
  },
  {
    id: 44,
    note:
      'Die Raketenkarten müssen je einen Stich gewinnen. Als erstes die 1er Rakete, dann die 2er, 3er und zuletzt die 4er',
    taskCards: 0,
    taskTokens: [],
  },
  {
    id: 45,
    note: '',
    taskCards: 9,
    taskTokens: [
      TaskTokenEnum.TOKEN_BEFORE_1,
      TaskTokenEnum.TOKEN_BEFORE_2,
      TaskTokenEnum.TOKEN_BEFORE_3,
    ],
  },
  {
    id: 46,
    note:
      'Das Crewmitglied links von dem mit der roten 9 muss alle roten Karten gewinnen. Sagt an wer die rote 9 hat',
    taskCards: 9,
    taskTokens: [],
  },
  {
    id: 47,
    note: '',
    taskCards: 10,
    taskTokens: [],
  },
  {
    id: 48,
    note: 'Das Auftragsplätchen muss im letzten Stich erfüllt werden',
    taskCards: 3,
    taskTokens: [TaskTokenEnum.TOKEN_LAST],
  },
  {
    id: 49,
    note: '',
    taskCards: 10,
    taskTokens: [
      TaskTokenEnum.TOKEN_BEFORE_1,
      TaskTokenEnum.TOKEN_BEFORE_2,
      TaskTokenEnum.TOKEN_BEFORE_3,
    ],
  },
  {
    id: 50,
    note:
      'Der Kommandant bestimmt. Eine Person muss die ersten 4 Stiche gewinnen. Ein anderes muss genau den letzten Stich gewinnen. Die restlichen Mitglieder müssen alle anderen Stiche gewinnen',
    taskCards: 0,
    taskTokens: [],
  },
];
