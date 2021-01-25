import * as React from 'react';

const CopyNotice: React.FC<{ gameId: string; onConfirm: () => void }> = ({
  onConfirm,
  gameId,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className="text-white shadow cursor-pointer mx-4 sd:-mx-4 px-4 py-4 border-0 rounded relative mt-6 bg-red-500 flex"
      onClick={onConfirm}
    >
      <span className="text-xl inline-block mr-3 align-middle">
        <svg
          className="fill-current h-6 w-6 text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
        </svg>
      </span>
      <span className="inline-block align-middle mr-8">
        <b className="capitalize">Achtung!</b> Vergiss bitte nicht dir deine
        Spiel-ID <strong>{gameId}</strong> aufzuschreiben, damit du das Spiel
        später fortsetzen kannst
      </span>
      <button
        type="button"
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
      >
        <span>×</span>
      </button>
    </div>
  );
};

export default CopyNotice;
