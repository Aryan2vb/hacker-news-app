import { FC } from 'react';

import { NewsDataType } from 'types/news';

import { getTimeElapsedSinceNewsIsPosed } from '@utils/time';

type StoryFooterProps = {
  newsData: NewsDataType;
};

const StoryFooter: FC<StoryFooterProps> = ({ newsData }) => {
  const { author, points, created_at, num_comments } = newsData;

  return (
    <div className="flex gap-2 items-center font-semibold text-xs text-newsFontColor">
      <p>{points} points by</p>
      <p>{author}</p>
      <p>|</p>
      <p>{getTimeElapsedSinceNewsIsPosed(created_at)} ago</p>
      <p>|</p>
      <p>hide</p>
      <p>|</p>
      <p>{num_comments} comments</p>
    </div>
  );
};

export default StoryFooter;
