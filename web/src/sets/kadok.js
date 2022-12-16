import kadokLegalAudio from "../assets/sounds/kadok/kadok-legal.mp3";
import kadokeuvoumevingarAudio from "../assets/sounds/kadok/kadok-eu-vou-me-vingar.mp3";
import kadokvtncAudio from "../assets/sounds/kadok/kadok-vai-toma-no-seu-cu.mp3";

import Kadok from "../assets/images/kadok.png"

export default {
  userName: "Kadok",
  image: Kadok,
  sounds: [
    {
      source: kadokLegalAudio,
      title: "Legal",
      empty: false,
    },
    {
      source: kadokeuvoumevingarAudio,
      title: "Vou me vingar",
      empty: false,
    },
    {
      source: kadokvtncAudio,
      title: "VTNC",
      empty: false,
    },
  ],
};
