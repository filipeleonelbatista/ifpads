import so7VidaFacilAudio from "../assets/sounds/so7/so7-a-vida-facil.mp3";
import so7BarbieAudio from "../assets/sounds/so7/so7-chupava-peitinho-da-barbie.mp3";

export default {
  userName: "So7",
  image: require("../assets/images/so7.jpg"),
  sounds: [
    {
      source: so7VidaFacilAudio,
      title: "Vida Fácil",
      empty: false,
    },
    {
      source: so7BarbieAudio,
      title: "Chupar peitinho da Barbie",
      empty: false,
    },
  ],
};
