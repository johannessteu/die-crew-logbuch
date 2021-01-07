import Image from 'next/image';
import Section from '../components/Sections/Section';
import StartSection from '../components/Sections/StartSection';

export default function Home() {
  return (
    <>
      <StartSection />
      <Section bg="bg-gray-200">
        <div className="flex px-5">
          <div className="w-1/3 lg:max-w-md sm:visible mr-6">
            <Image
              src="/die-crew.png"
              alt="Die Crew"
              width={300}
              height={400}
            />
          </div>
          <div className="flex-1">
            <span className="font-mono uppercase">
              Kennerspiel des Jahres 2020
            </span>
            <h1 className="text-3xl mb-6">Die Crew</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
