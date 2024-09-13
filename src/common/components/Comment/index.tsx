import { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';

import CommentHeader from '@elements/CommentHeader';

import { CommentDataType } from 'types/comments';

type CommentPropsType = {
  commentData: CommentDataType;
};

const News: FC<CommentPropsType> = ({ commentData }) => {
  const {} = commentData;
  return (
    <div className="flex gap-5 px-8 py-5 rounded-md border-b-[1px] bg-primaryLight">
      <div className="flex flex-col gap-5">
        <CommentHeader commentData={commentData} />
        <div className="flex flex-col gap-2 text-md">
          {ReactHtmlParser(commentData.comment_text)}
        </div>
      </div>
    </div>
  );
};

export default News;
