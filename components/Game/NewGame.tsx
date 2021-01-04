import { useRouter } from 'next/router';
import qs from 'querystring';
import * as React from 'react';
import { useState } from 'react';
import Section from '../Section';

const AttendeeTag: React.FC = ({ children }) => {
  return <li className="p-4 hover:bg-gray-50 cursor-pointer">{children}</li>;
};

const NewGame: React.FC = ({ children }) => {
  const router = useRouter();
  const [newAttendee, setNewAttendee] = useState('');
  const [attendees, setAttendees] = useState<string[]>([]);

  const handleCreateGame = async () => {
    const res = await fetch(
      'api/startgame?' + qs.stringify({ attendees })
    ).then((res) => res.json());

    // Give firebase some time
    setTimeout(() => {
      if (res.success === true) {
        router.push(`/spiel/${res.identifier}`);
      }
    }, 500);
  };

  return (
    <Section bg="white">
      <h1>Begib dich auf eine neue Mission!</h1>
      <p>Wer gehört alles deiner Crew an?</p>

      <input
        className="inp"
        placeholder="Spielername"
        value={newAttendee}
        onChange={(e) => setNewAttendee(e.target.value)}
      />
      <button
        className="btn btn-secondary"
        onClick={() => {
          setAttendees([...attendees, newAttendee]);
          setNewAttendee('');
        }}
      >
        Hinzufügen
      </button>

      <div className="bg-white shadow-md rounded-md w-1/2">
        <ul className="divide-y divide-gray-300">
          {attendees.map((attendee) => (
            <AttendeeTag key={attendee}>{attendee}</AttendeeTag>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={() => handleCreateGame()} className="btn btn-primary">
          Spiel starten
        </button>
      </div>
    </Section>
  );
};

export default NewGame;
