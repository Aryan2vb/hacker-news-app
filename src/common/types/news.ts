export type NewsDataType = {
  id: number;
  created_at: string;
  title: string;
  author: string;
  url: string;
  points: number;
  num_comments: number;
};

export type APINewsDataType = {
  id: number;
  created_at: string;
  author: string;
  title: string;
  url: string;
  text: string | null;
  points: number;
  parent_id: number;
  num_comments: number;
  children: APINewsDataType[];
};
