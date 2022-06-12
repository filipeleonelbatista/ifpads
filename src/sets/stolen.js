import stolenNoveAudio from "../assets/sounds/stolen/stolen-9.mp3";
import stolenComerBundaAudio from "../assets/sounds/stolen/stolen-comer-bunda-com-bunda.mp3";
import stolenNossaSenhoraAudio from "../assets/sounds/stolen/stolen-nossa-senhora.mp3";
import stolenVaiGuardandoChatAudio from "../assets/sounds/stolen/stolen-vai-guardando-chat-9.mp3";

export default {
  userName: "Stolen",
  image: require("../assets/images/stolen.jpg"),
  sounds: [
    {
      source: stolenNoveAudio,
      title: "9",
      empty: false,
    },
    {
      source: stolenComerBundaAudio,
      title: "Comer bunda com bunda",
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
  ],
};
