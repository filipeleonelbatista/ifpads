import marginalenfioalinguaAudio from "../assets/sounds/marginalx11/enfioalingua.mp3";
import marginalvoudarmeucuAudio from "../assets/sounds/marginalx11/voudarmeucu.mp3";

export default {
  userName: "MarginalX11",
  image: require("../assets/images/marginalx11.jpg"),
  sounds: [
    {
      source: marginalenfioalinguaAudio,
      title: "Enfio a Lingua",
      empty: false,
    },
    {
      source: marginalvoudarmeucuAudio,
      title: "Vou dar meu c#",
      empty: false,
    },
  ],
};
