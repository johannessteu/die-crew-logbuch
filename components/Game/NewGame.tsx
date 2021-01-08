import { useRouter } from 'next/router';
import qs from 'querystring';
import * as React from 'react';
import { useRef, useState } from 'react';

const AttendeeTag: React.FC = ({ children }) => {
  return <li className="p-4 text-xl text-gray-900">{children}</li>;
};

const NewGame: React.FC = () => {
  const router = useRouter();
  const newAttendeeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [crewName, setCrewName] = useState('');
  const [newAttendee, setNewAttendee] = useState('');
  const [attendees, setAttendees] = useState<string[]>([]);

  const handleCreateGame = async () => {
    setLoading(true);
    const res = await fetch(
      `api/startgame?${qs.stringify({ attendees, crewName })}`
    ).then((r) => r.json());

    // Give firebase some time
    setTimeout(() => {
      if (res.success === true) {
        router.push(`/spiel/${res.identifier}`);
      }
    }, 500);
  };

  const isValid = crewName.length > 0 && attendees.length > 1;

  const handleAddNewCrewMember = () => {
    setAttendees([...attendees, newAttendee]);
    setNewAttendee('');
    newAttendeeRef.current.focus();
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-stretch">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="crewName" className="block font-mono mb-2 text-md">
          Gibt deiner Crew einen Namen
        </label>
        <input
          id="crewName"
          className="inp"
          placeholder="Crew-Name"
          value={crewName}
          onChange={(e) => setCrewName(e.target.value)}
        />
      </div>

      <div className="mb-6 ">
        <label htmlFor="newMember" className="block font-mono mb-2 text-md">
          Wer ist alles Teil deiner Crew?
        </label>
        <div className="flex">
          <input
            id="newMember"
            ref={newAttendeeRef}
            className="inp w-2/3 mr-3"
            placeholder="Astronautin Jutta"
            value={newAttendee}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddNewCrewMember();
              }
            }}
            onChange={(e) => setNewAttendee(e.target.value)}
          />
          <button
            type="button"
            className="btn"
            onClick={() => handleAddNewCrewMember()}
          >
            Hinzufügen
          </button>
        </div>
      </div>
      {attendees.length > 0 && (
        <>
          <span className="block font-mono mb-2 text-md">Crew Mitglieder</span>

          <div className="bg-white rounded-md md:w-2/3 mb-6">
            <ul className="divide-y divide-gray-300 ">
              {attendees.map((attendee) => (
                <AttendeeTag key={attendee}>{attendee}</AttendeeTag>
              ))}
            </ul>
          </div>
        </>
      )}

      <svg
        className="animate-spin h-5 w-5 text-white fill-current "
        viewBox="0 0 24 24"
      />
      <div>
        <button
          type="submit"
          disabled={!isValid || loading}
          onClick={() => handleCreateGame()}
          className="btn btn-primary disabled:opacity-70 flex"
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {loading ? 'Spiel wird gestartet' : 'Auf zum 9. Planeten!'}
        </button>
      </div>
    </>
  );
};

export default NewGame;
