import * as React from 'react';
import { FeedbackFish } from '@feedback-fish/react';

const FeedbackBubble: React.FC = () => {
  return (
    <div className="fixed btn btn-feedback right-0 bottom-2 cursor-pointer group">
      <FeedbackFish projectId="d13b53ec0f4a32">
        <div className="flex justify-center items-center group">
          <span className="text-xl">📣</span>
          <span className="ml-2 hidden md:inline group-hover:inline">
            Feedback
          </span>
        </div>
      </FeedbackFish>
    </div>
  );
};

export default FeedbackBubble;
