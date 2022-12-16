import { Audio } from "expo-av";
import { createContext, useEffect, useState } from "react";
import Pads from "../sets/index";
import RemoteControls from "../remotecontrol/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Alert } from "react-native";
import { remove } from 'remove-accents'
export const AudioContext = createContext({});

export function AudioContextProvider(props) {
  const chanellsOnRemoteControl = {
    colonogamer: 26620348,//colonogamer
    batera: 36254610,//batera
  }

  const [tema, setTema] = useState('white');
  const [pads, setPads] = useState(false);
  const [padColor, setpadColor] = useState("#ff0000");
  const [padTextColor, setpadTextColor] = useState("#000000");
  const [favPad, setFavPad] = useState(1);
  const [selectedPad, setSelectedPad] = useState(null);
  const [showTiltButton, setShowTiltButton] = useState(false)
  const [isMyPad, setIsMyPad] = useState(false)

  const [twitchUser, setTwitchUser] = useState("")

  const [remoteControls, setRemoteControls] = useState([])
  const [selectedRemoteControl, setSelectedRemoteControl] = useState(null)

  const [sound, setSound] = useState();

  const handleChangeTiltState = async () => {
    setShowTiltButton(!showTiltButton)
    await AsyncStorage.setItem('@showTiltButton', JSON.stringify(!showTiltButton))
  }

  const playRandomAudio = async () => {
    const selectedIndexPad = Math.floor(Math.random() * pads.length)
    const selectedIndexAudio = Math.floor(Math.random() * pads[selectedIndexPad].sounds.length)
    await playSound(pads[selectedIndexPad].sounds[selectedIndexAudio].source)
  }

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

  const getAuthToken = async () => {
    try {
      const responseToken = await axios.post('https://id.twitch.tv/oauth2/token?client_id=laxi0xmdz4z2k9p0ntipo0utwnyzf2&client_secret=j3q3dhifqxnagcdrlnv0gby3j9gg0i&grant_type=client_credentials')

      return responseToken.data
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao verificar dados na Twitch', 'Não foi possível obter os dados para validar seu usuário. Tente novamente mais tarde!')
    }
  }

  const validateTwitchUser = async () => {
    let tokenObject = await getAuthToken()
    try {
      const response = await axios.get(`https://api.twitch.tv/helix/users?login=${remove(twitchUser.toLowerCase())}`, {
        headers: {
          'Authorization': `Bearer ${tokenObject.access_token}`,
          'Client-Id': 'laxi0xmdz4z2k9p0ntipo0utwnyzf2'
        }
      })

      if (response.data.data.length === 0) {
        Alert.alert('Não encontramos seu usuário na Twitch', 'Não encontramos seu usuário na twitch. Tente novamente.')
        return
      } else {
        return response.data.data[0]
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao verificar dados na Twitch', 'Não foi possível obter os dados para validar seu usuário. Tente novamente mais tarde!')
    }
  }

  const checkIfTwitchUserFollowsChannel = async (selectedChannel, command) => {
    let tokenObject = await getAuthToken()
    let userObject = {}

    try {
      const response = await axios.get(`https://api.twitch.tv/helix/users?login=${remove(twitchUser.toLowerCase())}`, {
        headers: {
          'Authorization': `Bearer ${tokenObject.access_token}`,
          'Client-Id': 'laxi0xmdz4z2k9p0ntipo0utwnyzf2'
        }
      })
      if (response.data.data.length === 0) {
        Alert.alert('Não encontramos seu usuário na Twitch', 'Não encontramos seu usuário na twitch. Tente novamente.')
        return false
      } else {
        userObject = response.data.data[0]
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao verificar dados na Twitch', 'Não foi possível obter os dados para validar seu usuário. Tente novamente mais tarde!')
      return false
    }


    try {
      const response = await axios.get(`https://api.twitch.tv/helix/users/follows?from_id=${userObject.id}`, {
        headers: {
          'Authorization': `Bearer ${tokenObject.access_token}`,
          'Client-Id': 'laxi0xmdz4z2k9p0ntipo0utwnyzf2'
        }
      })
      if (response.data.data.length === 0) {
        Alert.alert('Você não segue os canais da IF na Twitch', 'Para usar esta função é necessário seguir os canais da twitch dos membros da IF.')
        return false
      } else {
        const channelsUserFollows = response.data.data

        const userFollowChannel = channelsUserFollows.filter(channel => chanellsOnRemoteControl[selectedChannel] === Number(channel.to_id))

        if (userFollowChannel.length === 0) {
          Alert.alert(`Você não segue o canal ${selectedChannel} na Twitch`, `Para usar este comando ${command} é necessário seguir o canal ${selectedChannel} na Twitch`)
          return false
        } else {
          return true
        }
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao verificar dados na Twitch', 'Não foi possível obter os dados para validar seu usuário. Tente novamente mais tarde!')
      return false
    }
  }

  const handleSaveTwitch = async () => {
    let userObject = await validateTwitchUser()

    await AsyncStorage.setItem('@twitchUser', twitchUser)
  }

  useEffect(() => {
    if (pads) {
      const isMyPad = pads.findIndex(pad => pad.userName === selectedPad.userName) === 0
      setIsMyPad(isMyPad)
    }
  }, [selectedPad])

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
        let tu = await AsyncStorage.getItem('@twitchUser')
        let ts = await AsyncStorage.getItem('@showTiltButton')
        let cp = await AsyncStorage.getItem('@color_pad')
        let cpt = await AsyncStorage.getItem('@color_pad_text')

        let value = await AsyncStorage.getItem('@my_pad')

        if (themeStorage == null) {
          await AsyncStorage.setItem('@theme', "white")
        }

        if (ts == null) {
          await AsyncStorage.setItem('@showTiltButton', JSON.stringify(false))
        }

        if (tu == null) {
          await AsyncStorage.setItem('@twitchUser', "")
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
        setTwitchUser(tu != null ? tu : "")
        setShowTiltButton(ts != null ? JSON.parse(ts) : false)
        setTema(themeStorage != null ? themeStorage : 'white')
        setpadColor(cp != null ? cp : '#FF0000')
        setpadTextColor(cpt != null ? cpt : '#000000')
        setPads(padList);
        loadPreset(padList[favPad]);
        setRemoteControls([...RemoteControls])
        setSelectedRemoteControl(RemoteControls[0])

      } catch (e) {
        console.error(e)
      }
    }
    getData();
  }, []);

  useEffect(() => {
    console.log("Pads atualizados!");
  }, [pads]);

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
        remoteControls,
        selectedRemoteControl,
        setSelectedRemoteControl,
        twitchUser, setTwitchUser,
        handleSaveTwitch,
        checkIfTwitchUserFollowsChannel
      }}
    >
      {props.children}
    </AudioContext.Provider>
  );
}
