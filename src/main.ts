import "./style.css";
import ko from "knockout";
import Navigo from "navigo";

import duels from "./images.ts";
import { Duel, DuelRouteParams, ImageRouteParams } from "./types";

class WebmailViewModel {
  // Data
  constructor() {
    this.duels = duels.sort((a, b) => (a.date < b.date ? 1 : -1));
    this.chosenDuel = ko.observable();
    this.chosenImage = ko.observable();

    // Behaviours
    this.goToDuel = (duel: Duel) => {
      router.navigate(duel.title);
    };

    this.goToImage = (image: string, duel: Duel, event) => {
      if (this.chosenImage() !== image) {
        event.stopPropagation();
        router.navigate(`${duel.title}/${image}`);
      }
    };

    let router = new Navigo("/", { hash: true });

    router.on("/:title", (params) => {
      const { title } = params?.data as DuelRouteParams;
      console.log(title);
      this.chosenDuel(duels.find((duel) => duel.title === title));
      this.chosenImage(undefined);
    });

    router.on("/:title/:image", (params) => {
      const { title, image } = params?.data as ImageRouteParams;
      this.chosenDuel(duels.find((duel) => duel.title === title));
      this.chosenImage(image);
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

  isDuelActive = (duel: Duel) => {
    return duel.date === this.chosenDuel()?.date;
  };

  isImageActive = (title: string, image: string) => {
    console.log(title, image);
    return title === this.chosenDuel()?.title && image === this.chosenImage();
  };
}

ko.applyBindings(new WebmailViewModel());

interface WebmailViewModel {
  duels: Duel[];
  chosenDuel: ko.Observable<Duel | undefined>;
  chosenImage: ko.Observable<string | undefined>;
  goToDuel: (duel: Duel) => void;
  goToImage: (image: string, duel: Duel, event: Event) => void;
  isImage: (filename: string) => boolean;
  isVideo: (filename: string) => boolean;
}
