import funkySucessoAudio from "../assets/sounds/funky/funky-com-sucesso-eu-diria.mp3";
import funkyMeFuderamAudio from "../assets/sounds/funky/funky-me-fuderam-vei.mp3";
import funkyRespeitoAudio from "../assets/sounds/funky/funky-ninguem-me-respeita-aqui.mp3";

import Funky from "../assets/images/funky.jpg"

export default {
  userName: "Funky",
  image: Funky,
  sounds: [
    {
      source: funkySucessoAudio,
      title: "Com sucesso eu diria",
      empty: false,
    },
    {
      source: funkyMeFuderamAudio,
      title: "Me F#d3r4m Veio",
      empty: false,
    },
    {
      source: funkyRespeitoAudio,
      title: "Ninguem Respeita",
      empty: false,
    },
  ],
};
