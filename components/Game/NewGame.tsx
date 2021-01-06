import { useRouter } from 'next/router';
import qs from 'querystring';
import * as React from 'react';
import { useRef, useState } from 'react';

const AttendeeTag: React.FC = ({ children }) => {
  return <li className="p-4 text-xl text-gray-900">{children}</li>;
};

const NewGame: React.FC = ({ children }) => {
  const router = useRouter();
  const newAttendeeRef = useRef(null);
  const [crewName, setCrewName] = useState('');
  const [newAttendee, setNewAttendee] = useState('');
  const [attendees, setAttendees] = useState<string[]>([]);

  const handleCreateGame = async () => {
    const res = await fetch(
      'api/startgame?' + qs.stringify({ attendees, crewName })
    ).then((res) => res.json());

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
        <label className="block font-mono mb-2 text-md">
          Gibt deiner Crew einen Namen
        </label>
        <input
          className="inp"
          placeholder="Crew-Name"
          value={crewName}
          onChange={(e) => setCrewName(e.target.value)}
        />
      </div>

      <div className="mb-6 ">
        <label className="block font-mono mb-2 text-md">
          Wer ist alles Teil deiner Crew?
        </label>
        <div className="flex">
          <input
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
          <button className="btn" onClick={() => handleAddNewCrewMember()}>
            Hinzufügen
          </button>
        </div>
      </div>
      {attendees.length > 0 && (
        <>
          <label className="block font-mono mb-2 text-md">
            Crew Mitglieder
          </label>

          <div className="bg-white rounded-md md:w-2/3 mb-6">
            <ul className="divide-y divide-gray-300 ">
              {attendees.map((attendee) => (
                <AttendeeTag key={attendee}>{attendee}</AttendeeTag>
              ))}
            </ul>
          </div>
        </>
      )}

      <div>
        <button
          disabled={!isValid}
          onClick={() => handleCreateGame()}
          className="btn btn-primary disabled:opacity-70"
        >
          Auf zum 9. Planeten!
        </button>
      </div>
    </>
  );
};

export default NewGame;
