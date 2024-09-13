export type CommentDataType = {
  created_at: string;
  author: string;
  points: number;
  comment_text: string;
  story_id: number;
  story_title: string;
  story_url: string;
};

type _HighlightResultValue = {
  value: string;
  matchLevel: number;
  matchedWords: string[];
};

export type APICommentDataType = {
  title: string;
  url: string;
  story_text: string;
  num_comments: number;
  parent_id: number;
  relevancy_score: number;
  tags: string[];
  _highlightResult: {
    title: _HighlightResultValue;
    url: _HighlightResultValue;
    auhtor: _HighlightResultValue;
    comment_text: _HighlightResultValue;
    story_title: _HighlightResultValue;
    story_url: _HighlightResultValue;
  };
} & CommentDataType;
