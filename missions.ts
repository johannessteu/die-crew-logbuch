import { GameMissionInterface, TaskTokenEnum } from './interfaces';

export const missions: GameMissionInterface[] = [
  {
    id: 1,
    note: '',
    taskCards: 2,
    taskTokens: [],
  },
  {
    id: 2,
    note: '',
    taskCards: 3,
    taskTokens: [TaskTokenEnum.TOKEN_FIRST, TaskTokenEnum.TOKEN_SECOND],
  },
  {
    id: 3,
    note:
      'Der Kommander fragt nach dem Befinden der mitspieler und bestimmt wer keinen Stick bekommen darf',
    taskCards: 4,
    taskTokens: [
      TaskTokenEnum.TOKEN_BEFORE_1,
      TaskTokenEnum.TOKEN_BEFORE_3,
      TaskTokenEnum.TOKEN_BEFORE_2,
      TaskTokenEnum.TOKEN_LAST,
      TaskTokenEnum.TOKEN_BEFORE_4,
    ],
  },
  {
    id: 4,
    note: '',
    taskCards: 2,
    taskTokens: [],
  },
  {
    id: 5,
    note: '',
    taskCards: 2,
    taskTokens: [TaskTokenEnum.TOKEN_BEFORE_1, TaskTokenEnum.TOKEN_BEFORE_2],
  },
  {
    id: 6,
    note: 'Noch eine Note',
    taskCards: 7,
    taskTokens: [TaskTokenEnum.TOKEN_LAST],
  },
];
