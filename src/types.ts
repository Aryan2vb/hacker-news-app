export interface User {
  name: string;
  email: string;
}

export interface Story {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}