import Image from 'next/image';
import Section from '../components/Sections/Section';
import StartSection from '../components/Sections/StartSection';

export default function Home() {
  return (
    <>
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
            <h1 className="text-3xl mb-6">Die Crew</h1>
            <p>
              Das Spiel "Die Crew" ist ein kooperatives Kartenspiel, dass im
              KOSMOS-Verlag erschienen ist. Bei diesem Stichspiel geht es darum
              im Team verteilte Aufgaben zu bewältigen. Der Clou: Ihr dürft
              dabei nicht miteinander kommunizieren. Hier liegt der Reiz in dem
              Spiel. Ihr gewinnt und verliert gemeinsam. 2020 wurde es mit der
              Auszeichnung Diese Crew begibt sich "Kennerspiel des Jahres 2020"
              geehrt.
            </p>
            <p className="mt-3">
              Als Crew begebt ihr euch bei dem Spiel auf die Reise zum 9.
              Planeten. Euren Spielfortschritt könnt ihr im Logbuch notieren.
              Allerdigns müsst ihr dafür das Logbuch, dass im Spiel beigelegt
              ist, beschriften. Daher findet ihr hier eine digitale Version des
              Logbuchs. Startet einfach ein neues Spiel und schon kannes
              losgehen!
            </p>

            <h3 className=" mt-8 mb-3 text-xl font-mono uppercase">
              Spielanleitung
            </h3>
            <p className="mb-2">
              Für einen schnellen Einstieg in das Spiel bieten sich
              Youtube-Tutorials an!
            </p>
            <iframe
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
    </>
  );
}
