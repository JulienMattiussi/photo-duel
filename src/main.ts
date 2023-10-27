import "./style.css";
import ko from "knockout";
import Navigo from "navigo";
import duels, { Duel } from "./images/index.ts";

console.log(duels);

interface DuelRouteParams {
  [key: string]: string;
  title: string;
}

function WebmailViewModel() {
  // Data
  var self = this;
  self.duels = duels.sort((a, b) => (a.date > b.date ? 1 : -1));
  self.chosenDuel = ko.observable();

  // Behaviours
  self.goToDuel = function (duel: Duel) {
    router.navigate(duel.title);
  };

  var router = new Navigo("/", { hash: true });

  router.on("/:title", (params) => {
    const { title } = params?.data as DuelRouteParams;
    self.chosenDuel(duels.find((duel) => duel.title === title));
  });

  router.on("/", () => {
    router.navigate(`/${self.duels[0].title}`);
  });

  router.resolve("/");
}

ko.applyBindings(new WebmailViewModel());
