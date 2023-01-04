
import { createContext, useEffect, useState } from "react";
import Pads from "../sets/index";
import UserImage from "../assets/images/user.png"

export const AudioContext = createContext({});

export function AudioContextProvider(props) {
  const sound = new Audio()

  const [tema, setTema] = useState('white');
  const [pads, setPads] = useState(false);
  const [padColor, setpadColor] = useState("#ff0000");
  const [padTextColor, setpadTextColor] = useState("#000000");
  const [favPad, setFavPad] = useState(1);
  const [selectedPad, setSelectedPad] = useState(null);
  const [showTiltButton, setShowTiltButton] = useState(true)
  const [isMyPad, setIsMyPad] = useState(true)

  const handleChangeTiltState = async () => {

    console.log("ANALITYCS", "click", {
      link_id: `${!showTiltButton ? "habilitado" : "desabilitado"}-tilt`,
    })
    window.gtag('event', 'click', {
      link_id: `${!showTiltButton ? "habilitado" : "desabilitado"}-tilt`,
    })

    setShowTiltButton(!showTiltButton)
    localStorage.setItem('@showTiltButton', JSON.stringify(!showTiltButton))
  }

  const playRandomAudio = async () => {
    const selectedIndexPad = Math.floor(Math.random() * pads.length)
    const selectedIndexAudio = Math.floor(Math.random() * pads[selectedIndexPad].sounds.length)

    console.log("ANALITYCS", "click", {
      link_id: `play-tilt-${pads[selectedIndexPad].userName.replaceAll(' ', '')}-${pads[selectedIndexPad].sounds[selectedIndexAudio].title.replaceAll(' ', '')}`,
    })
    window.gtag('event', 'click', {
      link_id: `play-tilt-${pads[selectedIndexPad].userName.replaceAll(' ', '')}-${pads[selectedIndexPad].sounds[selectedIndexAudio].title.replaceAll(' ', '')}`,
    })

    await playSound(pads[selectedIndexPad].sounds[selectedIndexAudio].source)
  }

  const handleChangeTema = async (selectedTema) => {
    setTema(selectedTema)
    localStorage.setItem('@theme', selectedTema)
  }
  const handleSetPadColor = async (color) => {

    console.log("ANALITYCS", "click", {
      link_id: `color-${color.replace("#", "")}`,
    })
    window.gtag('event', 'click', {
      link_id: `color-${color.replace("#", "")}`,
    })

    setpadColor(color)
    localStorage.setItem('@color_pad', color)
  }

  const handleSetPadTextColor = async (color) => {
    console.log("ANALITYCS", "click", {
      link_id: `color-${color.replace("#", "")}`,
    })
    window.gtag('event', 'click', {
      link_id: `color-${color.replace("#", "")}`,
    })

    setpadTextColor(color)
    localStorage.setItem('@color_pad_text', color)
  }

  async function playSound(source) {
    if (!source) return;
    // const sound = new Audio(source);
    sound.src = source
    await sound.play();
  }

  const loadPreset = (userPreset) => {
    setSelectedPad(userPreset);
  }

  useEffect(() => {
    if (pads) {
      const isMyPad = pads.findIndex(pad => pad.userName === selectedPad.userName) === 0
      setIsMyPad(isMyPad)
    }
  }, [selectedPad])

  useEffect(() => {
    const getData = async () => {
      try {
        let themeStorage = localStorage.getItem('@theme')
        let ts = localStorage.getItem('@showTiltButton')
        let cp = localStorage.getItem('@color_pad')
        let cpt = localStorage.getItem('@color_pad_text')

        let value = localStorage.getItem('@my_pad')

        if (themeStorage == null) {
          localStorage.setItem('@theme', "white")
        }

        if (ts == null) {
          localStorage.setItem('@showTiltButton', JSON.stringify(false))
        }

        if (cp == null) {
          localStorage.setItem('@color_pad', "#FF0000")
        }

        if (cpt == null) {
          localStorage.setItem('@color_pad_text', "#000000")
        }

        if (value != null) {
          value = JSON.parse(value)
        } else {
          value = {
            userName: "Meu Pad",
            image: UserImage,
            sounds: []
          }

          localStorage.setItem('@my_pad', JSON.stringify(value))
        }

        const padList = [
          value,
          ...Pads
        ]
        setShowTiltButton(ts != null ? JSON.parse(ts) : false)
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
  }, [pads])

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
        tema, setTema, handleChangeTema,
        showTiltButton,
        playRandomAudio,
        handleChangeTiltState,
        isMyPad,
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}