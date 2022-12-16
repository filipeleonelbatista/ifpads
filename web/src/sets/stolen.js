import stolenNoveAudio from "../assets/sounds/stolen/stolen-9.mp3";
import stolenComerBundaAudio from "../assets/sounds/stolen/stolen-comer-bunda-com-bunda.mp3";
import stolenNossaSenhoraAudio from "../assets/sounds/stolen/stolen-nossa-senhora.mp3";
import stolenVaiGuardandoChatAudio from "../assets/sounds/stolen/stolen-vai-guardando-chat-9.mp3";
import stolenfizmerdaAudio from "../assets/sounds/stolen/stolen-fiz-merda.mp3";
import stolenvouchutarseucuAudio from "../assets/sounds/stolen/stolen-vou-Chutar-seu-Cu.mp3";
import stolenvaichorarAudio from "../assets/sounds/stolen/vaichorar-stolen.mp3";

import Stolen from "../assets/images/stolen.jpg"

export default {
  userName: "Stolen",
  image: Stolen,
  sounds: [
    {
      source: stolenNoveAudio,
      title: "9",
      empty: false,
    },
    {
      source: stolenComerBundaAudio,
      title: "Comer bnda com bnda",
      empty: false,
    },
    {
      source: stolenNossaSenhoraAudio,
      title: "Nossa senhora",
      empty: false,
    },
    {
      source: stolenVaiGuardandoChatAudio,
      title: "Vai Guardando Chat, 9",
      empty: false,
    },
    {
      source: stolenfizmerdaAudio,
      title: "Fiz m3rd4",
      empty: false,
    },
    {
      source: stolenvouchutarseucuAudio,
      title: "Vou chutar seu C#",
      empty: false,
    },
    {
      source: stolenvaichorarAudio,
      title: "Vai Chorar",
      empty: false,
    },
  ],
};
