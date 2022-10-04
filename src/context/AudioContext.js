import { Audio } from "expo-av";
import { createContext, useEffect, useState } from "react";
import Pads from "../sets/index";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AudioContext = createContext({});

export function AudioContextProvider(props) {

  const [tema, setTema] = useState('white');
  const [pads, setPads] = useState(false);
  const [padColor, setpadColor] = useState("#ff0000");
  const [padTextColor, setpadTextColor] = useState("#000000");
  const [favPad, setFavPad] = useState(1);
  const [selectedPad, setSelectedPad] = useState(null);

  const [sound, setSound] = useState();

  const handleChangeTema = async (selectedTema) => {
    setTema(selectedTema)
    await AsyncStorage.setItem('@theme', selectedTema)

  }
  const handleSetPadColor = async (color) => {
    setpadColor(color)
    await AsyncStorage.setItem('@color_pad', color)
  }

  const handleSetPadTextColor = async (color) => {
    setpadTextColor(color)
    await AsyncStorage.setItem('@color_pad_text', color)
  }

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
    const getData = async () => {
      try {
        let themeStorage = await AsyncStorage.getItem('@theme')
        let cp = await AsyncStorage.getItem('@color_pad')
        let cpt = await AsyncStorage.getItem('@color_pad_text')

        let value = await AsyncStorage.getItem('@my_pad')

        if (themeStorage == null) {
          await AsyncStorage.setItem('@theme', "white")
        }
        
        if (cp == null) {
          await AsyncStorage.setItem('@color_pad', "#FF0000")
        }

        if (cpt == null) {
          await AsyncStorage.setItem('@color_pad_text', "#000000")
        }

        if (value != null) {
          value = JSON.parse(value)
        } else {
          value = {
            userName: "Meu Pad",
            image: require("../assets/images/user.png"),
            sounds: []
          }

          await AsyncStorage.setItem('@my_pad', JSON.stringify(value))
        }

        const padList = [
          value,
          ...Pads
        ]
        setTema(themeStorage != null ? themeStorage : 'white')
        setpadColor(cp != null ? cp : '#FF0000')
        setpadTextColor(cpt != null ? cpt : '#000000')
        setPads(padList);
        loadPreset(padList[favPad]);

      } catch (e) {
        console.error(e)
      }
    }
    getData();
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
        padColor, setpadColor, handleSetPadColor,
        padTextColor, setpadTextColor, handleSetPadTextColor,
        favPad, setFavPad,
        tema, setTema, handleChangeTema
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}
