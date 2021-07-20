/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { FeedbackFish } from '@feedback-fish/react';
import Head from 'next/head';
import Image from 'next/image';

import FeedbackBubble from '../components/FeedbackBubble';
import Section from '../components/Sections/Section';
import StartSection from '../components/Sections/StartSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Die Crew - das digitale Logbuch</title>
        <meta
          name="description"
          content="
          Benutze jetzt die digitale Version des Logbuchs für das Spiel 'Die
          Crew'. Starte einfach jederzeit ein neues Spiel!"
        />
        <meta
          property="og:title"
          content="Die Crew - das digitale Logbuch"
          key="title"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <StartSection />
      <Section bg="bg-gray-200">
        <div className="flex flex-col md:flex-row px-5">
          <div className="w-4/5 xs:w-4/6 md:w-1/3 mx-auto md:mx-0 mb-6 md:mb-0 md:mr-6 text-center md:w-1/3 lg:max-w-md sm:visible">
            <Image
              src="/die-crew.png"
              alt="Die Crew"
              width={300}
              height={400}
            />
          </div>
          <div className="flex-1 w-full md:w-auto">
            <span className="font-mono uppercase">
              Kennerspiel des Jahres 2020
            </span>
            <h2 className="text-3xl mb-6">Das Spiel</h2>
            <p>
              Das Spiel "Die Crew" ist ein kooperatives Kartenspiel, dass im
              KOSMOS-Verlag erschienen ist. Bei diesem Stichspiel geht es darum
              im Team verteilte Aufgaben zu bewältigen. Der Clou: Ihr dürft
              dabei nicht miteinander kommunizieren. Genau hier liegt der Reiz
              in dem Spiel. Ihr gewinnt und verliert gemeinsam als eine Crew.
              2020 wurde das Spiel mit der Auszeichnung "Kennerspiel des Jahres
              2020" geehrt.
            </p>
            <p className="mt-3">
              Als Crew begebt ihr euch bei dem Spiel auf die Reise zum 9.
              Planeten. Euren Spielfortschritt könnt ihr im Logbuch notieren.
              Allerdigns müsst ihr dafür das Logbuch, dass im Spiel beigelegt
              ist, beschriften. So seit ihr auch limitiert mit wie vielen Leuten
              ihr die Reise zum 9. Planeten begehen wollt.Daher findet ihr hier
              eine digitale Version des Logbuchs. Startet einfach ein neues
              Spiel und schon kann es losgehen!
            </p>

            <h3 className=" mt-8 mb-3 text-xl font-mono uppercase">
              Spielanleitung
            </h3>
            <p className="mb-2">
              Für einen schnellen Einstieg in das Spiel bieten sich
              Youtube-Tutorials an!
            </p>
            <iframe
              title="Die Crew Tutorial"
              width="100%"
              height="315"
              src="https://www.youtube-nocookie.com/embed/6KsSq1kbnBo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </Section>
      <Section bg="bg-white">
        <div className="flex flex-col md:flex-row px-5">
          <div className="flex-1 w-full md:w-auto">
            <span className="font-mono uppercase">Der Nachfolger</span>
            <h2 className="text-3xl mb-6">Mission Tiefsee</h2>
            <p>
              Nachdem ihr auf dem Weg zum 9. Planeten das All erforscht habt
              geht es nun in dem Nachfolger in die Tiefsee! Dabei bleibt sich
              "Die Crew" seinem erfolgreichen Spiel treu. Erneut spielt ihr in
              diesem Kooperativen Spiel zusammen und versucht Missionen zu
              erfüllgen. Im Vergleich zum ersten Spiel kommt "Mission Tiefsee"
              auch mit einem Spielmodus für zwei Spieler daher.
            </p>
          </div>
          <div className="w-4/5 xs:w-4/6 md:w-1/3 mx-auto md:mx-0 mb-6 md:mb-0 md:ml-6 text-center md:w-1/3 lg:max-w-md sm:visible">
            <Image
              src="/mission-tiefsee.jpg"
              alt="Die Crew"
              width={300}
              height={400}
            />
          </div>
        </div>
      </Section>
      <FeedbackBubble />
    </>
  );
}
