// Can't use Union types as there are a few intersection of attributes between CommentDataType and NewsDataType
export type NewsAndCommentDataType = {
  // News Data Type
  id?: number;
  created_at?: string;
  title?: string;
  author?: string;
  url?: string;
  points?: number;
  num_comments?: number;

  // Comment Data Type - News Data Type
  comment_text?: string;
  story_id?: number;
  story_title?: string;
  story_url?: string;

  // to differentiate  between news and a comment
  isComment: boolean;
};
