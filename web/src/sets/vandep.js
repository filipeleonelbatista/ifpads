import vandepjadeiAudio from "../assets/sounds/vandep/jadei-vandep.mp3";
import vandevaichorarAudio from "../assets/sounds/vandep/vaichorar-vandep.mp3";
import vandepganheiAudio from "../assets/sounds/vandep/vandep-ganhei.mp3";
import vandepgostouAudio from "../assets/sounds/vandep/vandep-gostou.mp3";
import vandepserhumanobaixoAudio from "../assets/sounds/vandep/vandep-ser-humano-baixo.mp3";
import vandepvsfAudio from "../assets/sounds/vandep/vandep-vsf.mp3";

import Vandep from "../assets/images/vandep.jpg"

export default {
  userName: "Vandep",
  image: Vandep,
  sounds: [
    {
      source: vandepjadeiAudio,
      title: "Ja dei",
      empty: false,
    },
    {
      source: vandevaichorarAudio,
      title: "Vai Chorar",
      empty: false,
    },
    {
      source: vandepganheiAudio,
      title: "Ganhei",
      empty: false,
    },
    {
      source: vandepgostouAudio,
      title: "Gostou",
      empty: false,
    },
    {
      source: vandepserhumanobaixoAudio,
      title: "Ser Humano Baixo",
      empty: false,
    },
    {
      source: vandepvsfAudio,
      title: "Vsf",
      empty: false,
    },
  ],
};
