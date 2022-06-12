import { Audio } from "expo-av";
import { createContext, useEffect, useState } from "react";
import Pads from "../sets/index";

export const AudioContext = createContext({});

export function AudioContextProvider(props) {
  const [pads, setPads] = useState(false);
  const [selectedPad, setSelectedPad] = useState(null);

  const [sound, setSound] = useState();

  async function playSound(source) {
    if (!source) return;
    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
    await sound.playAsync();
  }

  const loadPreset = (userPreset) => {
    setSelectedPad(userPreset);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    setPads(Pads);
    loadPreset(Pads[0]);
  }, []);

  useEffect(() => {
    console.log("Pads atualizados!");
  }, [pads]);

  useEffect(() => {
    console.log("Pad atualizado!");
  }, [selectedPad]);

  return (
    <AudioContext.Provider
      value={{
        pads,
        setPads,
        selectedPad,
        setSelectedPad,
        playSound,
        loadPreset,
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}
