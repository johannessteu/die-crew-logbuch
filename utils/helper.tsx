import * as React from 'react';
import { SpecialNotesEnum, TaskTokenEnum } from '../interfaces';

const toTimeString = (secNum: number) => {
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - hours * 3600) / 60);

  return `
  ${hours > 0 ? `${hours} Stunden und ` : ''}${
    minutes === 1 ? '1 Minute' : minutes > 1 ? `${minutes} Minuten` : '-'
  }`;
};

export const getSpecialMissionNotes = (
  otherNote: string,
  notes: SpecialNotesEnum[],
  after?: number
): JSX.Element => {
  const text = notes.map((n) => {
    if (n === SpecialNotesEnum.RADIO_INTERFERENCE && after) {
      return SpecialNotesEnum.RADIO_INTERFERENCE.replace(
        'xx',
        after.toString()
      );
    }

    return n;
  });

  text.push(otherNote);

  if (text.length === 0) {
    return <p>keine</p>;
  }

  return <p>{text.join(' ')}</p>;
};

const getTokenElement = (token: TaskTokenEnum): JSX.Element => {
  switch (token) {
    case TaskTokenEnum.TOKEN_FIRST:
      return <span className="font-mono text-2xl">1</span>;
    case TaskTokenEnum.TOKEN_SECOND:
      return <span className="font-mono text-2xl">2</span>;
    case TaskTokenEnum.TOKEN_THIRD:
      return <span className="font-mono text-2xl">3</span>;
    case TaskTokenEnum.TOKEN_FOURTH:
      return <span className="font-mono text-2xl">4</span>;
    case TaskTokenEnum.TOKEN_FIFTH:
      return <span className="font-mono text-2xl">5</span>;
    case TaskTokenEnum.TOKEN_LAST:
      return <span className="font-mono text-2xl">&Omega;</span>;
    case TaskTokenEnum.TOKEN_BEFORE_1:
      return (
        <svg
          className="fill-current h-8 w-7"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
        </svg>
      );
    case TaskTokenEnum.TOKEN_BEFORE_2:
      return (
        <svg
          className="fill-current h-8 w-7"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <path
            d="M3.083 3.412l7.88 7.88-7.88 7.88 2.12 2.12 10-10-10-10-2.12 2.12z"
            fillRule="nonzero"
          />
          <path
            d="M9.219 3.267l7.88 7.88-7.88 7.88 2.12 2.12 10-10-10-10-2.12 2.12z"
            fillRule="nonzero"
          />
        </svg>
      );
    case TaskTokenEnum.TOKEN_BEFORE_3:
      return (
        <svg
          className="fill-current h-8 w-7"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <path
            d="M.097 3.907l7.88 7.88-7.88 7.88 2.12 2.12 10-10-10-10-2.12 2.12z"
            fillRule="nonzero"
          />
          <path
            d="M5.903 3.762l7.88 7.88-7.88 7.88 2.12 2.12 10-10-10-10-2.12 2.12z"
            fillRule="nonzero"
          />
          <path
            d="M11.79 3.691l7.88 7.88-7.88 7.88 2.12 2.12 10-10-10-10-2.12 2.12z"
            fillRule="nonzero"
          />
        </svg>
      );
    case TaskTokenEnum.TOKEN_BEFORE_4:
      return (
        <svg
          className="fill-current h-8 w-7"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <path
            d="M1.103 4.654l6.587 6.587-6.587 6.587 1.772 1.773 8.36-8.36-8.36-8.36-1.772 1.773z"
            fillRule="nonzero"
          />
          <path
            d="M5.103 4.654l6.587 6.587-6.587 6.587 1.772 1.773 8.36-8.36-8.36-8.36-1.772 1.773z"
            fillRule="nonzero"
          />
          <path
            d="M9.103 4.654l6.587 6.587-6.587 6.587 1.772 1.773 8.36-8.36-8.36-8.36-1.772 1.773z"
            fillRule="nonzero"
          />
          <path
            d="M13.103 4.654l6.587 6.587-6.587 6.587 1.772 1.773 8.36-8.36-8.36-8.36-1.772 1.773z"
            fillRule="nonzero"
          />
        </svg>
      );
    default:
      return <p>-</p>;
  }
};

export { toTimeString, getTokenElement };
