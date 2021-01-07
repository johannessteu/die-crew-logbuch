import * as React from 'react';

const TransparentBox: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <div className={`bg-gray-200 rounded px-5 py-3 bg-opacity-20 ${className}`}>
      {children}
    </div>
  );
};

export default TransparentBox;
