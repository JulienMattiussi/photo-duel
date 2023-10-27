const duels: Duel[] = [
  {
    date: new Date(2023, 9, 27, 20, 11, 0),
    title: "M&Ms",
    folder: "duel-23-10-27-B",
    initial: "init-MMs.jpg",
    answers: ["answer-1.jpg"],
  },
  {
    date: new Date(2023, 9, 27, 20, 40, 0),
    title: "Pince",
    folder: "duel-23-10-27-A",
    initial: "init-Pince.jpg",
    answers: ["answer-1.jpg"],
  },
];

export interface Duel {
  date: Date;
  title: string;
  folder: string;
  initial: string;
  answers: string[];
}

export default duels;
