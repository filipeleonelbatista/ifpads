import leEuToDormindoCaraAudio from "../assets/sounds/le/le-eu-to-dormindo-cara.mp3";
import leEuToDormindoVelhoAudio from "../assets/sounds/le/le-eu-to-dormindo-velho.mp3";
import leCuDoStolenAudio from "../assets/sounds/le/le-o-cu-do-stolen.mp3";
import leVontadeDeCagarAudio from "../assets/sounds/le/le-vontade-de-cagar.mp3";
import leVouDeCagarAudio from "../assets/sounds/le/le-vou-cagar.mp3";
import leclipeAudio from "../assets/sounds/le/le-clipe.mp3";
import lenaofoisemquererAudio from "../assets/sounds/le/NAo_foi_sem_querer.mp3";

import Leticia from "../assets/images/leticia.jpg"

export default {
  userName: "Lê",
  image: Leticia,
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
      title: "C# do St0len",
      empty: false,
    },
    {
      source: leVontadeDeCagarAudio,
      title: "Vontade de C@g@r",
      empty: false,
    },
    {
      source: leVouDeCagarAudio,
      title: "Vou C@g@r",
      empty: false,
    },
    {
      source: leclipeAudio,
      title: "Clipa",
      empty: false,
    },
    {
      source: lenaofoisemquererAudio,
      title: "Não foi sem querer",
      empty: false,
    },
  ],
};
