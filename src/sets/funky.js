import funkySucessoAudio from "../assets/sounds/funky/funky-com-sucesso-eu-diria.mp3";
import funkyMeFuderamAudio from "../assets/sounds/funky/funky-me-fuderam-vei.mp3";
import funkyRespeitoAudio from "../assets/sounds/funky/funky-ninguem-me-respeita-aqui.mp3";

export default {
  userName: "Funky",
  image: require("../assets/images/funky.jpg"),
  sounds: [
    {
      source: funkySucessoAudio,
      title: "Com sucesso eu diria",
      empty: false,
    },
    {
      source: funkyMeFuderamAudio,
      title: "Me Fuderam Veio",
      empty: false,
    },
    {
      source: funkyRespeitoAudio,
      title: "Ninguem Respeita",
      empty: false,
    },
  ],
};
