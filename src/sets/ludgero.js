import ludgeroPapapaAudio from "../assets/sounds/ludgero/ludgero-papapapa.mp3";
import ludgerovaivaivaiAudio from "../assets/sounds/ludgero/lud-vaivaivai.mp3";
import ludgerovemvemvemAudio from "../assets/sounds/ludgero/lud-vemvemvem.mp3";
import ludgerofizmerdaAudio from "../assets/sounds/ludgero/fiz_merda.mp3";
import ludgerovaichorarAudio from "../assets/sounds/ludgero/vai-chorar-lud.mp3";

export default {
  userName: "Ludgero",
  image: require("../assets/images/ludgero.jpg"),
  sounds: [
    {
      source: ludgeroPapapaAudio,
      title: "Papapapa",
      empty: false,
    },
    {
      source: ludgerovaivaivaiAudio,
      title: "Vai Vai Vai",
      empty: false,
    },
    {
      source: ludgerovemvemvemAudio,
      title: "Vem Vem Vem",
      empty: false,
    },
    {
      source: ludgerofizmerdaAudio,
      title: "Fiz Merda",
      empty: false,
    },
    {
      source: ludgerovaichorarAudio,
      title: "Vai chorar",
      empty: false,
    },
  ],
};
