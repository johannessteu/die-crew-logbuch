import * as React from 'react';

const Section: React.FC<{ bg: string }> = ({ bg, children }) => {
  return (
    <div className={`flex justify-center py-8 ${bg}`}>
      <div className="w-full sm:w-10/12 lg:w-4/5 max-w-7xl">{children}</div>
    </div>
  );
};

export default Section;
