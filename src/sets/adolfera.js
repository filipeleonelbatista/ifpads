import adolferaAproveitaEVaiTomarNoCuTbmAudio from "../assets/sounds/adolfz/adolfz-aproveita-e-vai-toma-no-cu-tbm.mp3";
import adolferaMeteOPeDaLiveAudio from "../assets/sounds/adolfz/adolfz-mete-o-pe-da-live.mp3";
import adolferaPrivacidadeAudio from "../assets/sounds/adolfz/adolfz-privacidade.mp3";
import adolferaTecnologiaDeMerdaAudio from "../assets/sounds/adolfz/adolfz-tecnologia-de-merda.mp3";

export default {
  userName: "Adolfera",
  image: require("../assets/images/adolfera.jpg"),
  sounds: [
    {
      source: adolferaAproveitaEVaiTomarNoCuTbmAudio,
      title: "Aproveita e VTNC",
      empty: false,
    },
    {
      source: adolferaMeteOPeDaLiveAudio,
      title: "Mete o pé da live",
      empty: false,
    },
    {
      source: adolferaPrivacidadeAudio,
      title: "Privacidade",
      empty: false,
    },
    {
      source: adolferaTecnologiaDeMerdaAudio,
      title: "Tecnologia de merda",
      empty: false,
    },
  ],
};
