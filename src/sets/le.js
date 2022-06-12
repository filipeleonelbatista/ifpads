import leEuToDormindoCaraAudio from "../assets/sounds/le/le-eu-to-dormindo-cara.mp3";
import leEuToDormindoVelhoAudio from "../assets/sounds/le/le-eu-to-dormindo-velho.mp3";
import leCuDoStolenAudio from "../assets/sounds/le/le-o-cu-do-stolen.mp3";
import leVontadeDeCagarAudio from "../assets/sounds/le/le-vontade-de-cagar.mp3";
import leVouDeCagarAudio from "../assets/sounds/le/le-vou-cagar.mp3";

export default {
  userName: "Lê",
  image: require("../assets/images/leticia.jpg"),
  sounds: [
    {
      source: leEuToDormindoCaraAudio,
      title: "Eu to dormindo cara",
      empty: false,
    },
    {
      source: leEuToDormindoVelhoAudio,
      title: "Eu to dormindo velho",
      empty: false,
    },
    {
      source: leCuDoStolenAudio,
      title: "Cu do Stolen",
      empty: false,
    },
    {
      source: leVontadeDeCagarAudio,
      title: "Vontade de Cagar",
      empty: false,
    },
    {
      source: leVouDeCagarAudio,
      title: "Vou Cagar",
      empty: false,
    },
  ],
};
