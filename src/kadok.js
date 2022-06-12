import kadokLegalAudio from "./assets/sounds/kadok/kadok-legal.mp3";

export default {
  userName: "Kadok",
  image: require("./assets/images/kadok.png"),
  sounds: [
    {
      source: kadokLegalAudio,
      title: "Legal",
      empty: false,
    },
  ],
};
