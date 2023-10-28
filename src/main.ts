import "./style.css";
import ko from "knockout";
import Navigo from "navigo";
import duels, { Duel } from "../public/images/index.ts";

interface DuelRouteParams {
  [key: string]: string;
  title: string;
}

interface WebmailViewModel {
  duels: Duel[];
  chosenDuel: ko.Observable<Duel | undefined>;
  goToDuel: (duel: Duel) => void;
  isImage: (filename: string) => boolean;
  isVideo: (filename: string) => boolean;
}

class WebmailViewModel {
  // Data
  constructor() {
    this.duels = duels.sort((a, b) => (a.date < b.date ? 1 : -1));
    this.chosenDuel = ko.observable();

    // Behaviours
    this.goToDuel = function (duel: Duel) {
      router.navigate(duel.title);
    };

    let router = new Navigo("/", { hash: true });

    router.on("/:title", (params) => {
      const { title } = params?.data as DuelRouteParams;
      this.chosenDuel(duels.find((duel) => duel.title === title));
    });

    router.on("/", () => {
      router.navigate(`/${this.duels[0].title}`);
    });

    router.resolve("/");
  }

  //Functions
  isImage = (filename: string) => {
    return !!filename.match(/\.(jpg|jpeg|png|gif)$/i);
  };

  isVideo = (filename: string) => {
    return !!filename.match(/\.(mp4|webm|ogg)$/i);
  };
}

ko.applyBindings(new WebmailViewModel());
