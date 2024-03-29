export interface Duel {
  date: Date;
  title: string;
  folder: string;
  initial: string;
  answers: string[];
  nsfw?: boolean;
}

export interface DuelRouteParams {
  [key: string]: string;
  title: string;
}

export interface ImageRouteParams {
  [key: string]: string;
  title: string;
  image: string;
}
