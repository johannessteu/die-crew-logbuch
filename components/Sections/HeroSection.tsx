import * as React from 'react';
import Image from 'next/image';

import { GameType } from '../../interfaces';
import DeepSeaBg from '../../public/deep-sea-bg.jpg';
import SpaceBg from '../../public/space.jpg';

const HeroSection: React.FC<{ background: GameType }> = ({
  background,
  children,
}) => {
  return (
    <div className="relative flex justify-center py-10 md:py-20">
      <Image
        className="object-center object-cover pointer-events-none"
        src={background === 'space' ? SpaceBg : DeepSeaBg}
        layout="fill"
        priority
        placeholder="blur"
      />
      <div className="relative place-self-center z-1 w-100 w-11/12 sm:w-10/12 lg:w-4/5 max-w-7xl">
        <div className="text-left w-full text-white">{children}</div>
      </div>
    </div>
  );
};

export default HeroSection;
