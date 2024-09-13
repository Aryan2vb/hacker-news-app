import { FC } from 'react';

import { CommentDataType } from 'types/comments';

import { getTimeElapsedSinceNewsIsPosed } from '@utils/time';

type CommentHeaderProps = {
  commentData: CommentDataType;
};

const CommentHeader: FC<CommentHeaderProps> = ({ commentData }) => {
  const { author, created_at, story_title, story_url } = commentData;

  return (
    <div className="flex gap-2 items-center font-semibold text-xs text-newsFontColor">
      <p>{author}</p>
      <p>|</p>
      <p>{getTimeElapsedSinceNewsIsPosed(created_at)} ago</p>
      <p>|</p>
      <p>parent</p>
      <p>|</p>
      <p>on :</p>
      <a href={story_url}>{story_title}</a>
    </div>
  );
};

export default CommentHeader;
