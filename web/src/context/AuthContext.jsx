
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import tmi from 'tmi.js';
import remotecontrol from "../remotecontrol";
import colonoBasicoAudio from "../assets/sounds/colono/Basico.mp3"

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [tmiClient, setTmiClient] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  const [passedBy, setPassedBy] = useState(false)

  const sendCommand = async (command, channel) => {
    await tmiClient.say(channel, command)
  }

  const handleLogout = async () => {
    console.log("ANALITYCS", "click", {
      link_id: 'logout-twitch',
    })
    window.gtag('event', 'click', {
      link_id: 'logout-twitch',
    })
    localStorage.removeItem("@token")
    setToken(null)
    setUser(null)
    setIsLogged(false)
  }

  const handleSignInTwitch = async () => {
    console.log("ANALITYCS", "click", {
      link_id: 'login-twitch',
    })
    window.gtag('event', 'click', {
      link_id: 'login-twitch',
    })
    const client_id = "aqy8kovqslooecitbx97ufthpnj9u4";
    const force_verify = true;
    const redirect_uri = window.location.origin + "/";
    const response_type = "token";
    const scope = "user:read:email user:read:follows user:read:subscriptions chat:edit chat:read";

    const url =
      `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&force_verify=${force_verify}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${encodeURI(scope)}`;

    window.open(url, '_self')
  }

  const validate = async (access_token) => {
    const result = await axios.get('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: 'Bearer ' + access_token,
      }
    })

    return result.data;
  }

  const getUser = async (access_token, login) => {
    const userInfo = await axios.get(`https://api.twitch.tv/helix/users?login=${login}`, {
      headers: {
        Authorization: 'Bearer ' + access_token,
        "Client-Id": 'aqy8kovqslooecitbx97ufthpnj9u4'
      }
    })

    return userInfo.data.data[0]
  }

  const checkFollowsIf = async (access_token, from_id) => {
    const followList = await axios.get(`https://api.twitch.tv/helix/users/follows?from_id=${from_id}`, {
      headers: {
        Authorization: 'Bearer ' + access_token,
        "Client-Id": 'aqy8kovqslooecitbx97ufthpnj9u4'
      }
    })

    const channelList = followList.data.data;

    const channelIFFollowed = []

    for (const channel of channelList) {
      const channelsVerificationArray = remotecontrol.filter(streamControl => streamControl.name === channel.to_login)
      if (channelsVerificationArray.length > 0) {
        channelIFFollowed.push(channel.to_login)
      }
    }

    return channelIFFollowed
  }

  const playAlert = () => {
    if (confirm("Pô, to pedindo o básico. Dá um follow nos canais dos membros da IF pra acessar o controle remoto!")) {
      document.getElementById("root").scroll({left:100})
      const sound = new Audio(colonoBasicoAudio);
      sound.volume = 0.1;
      sound.play();
    }
  }

  useEffect(() => {
    if (tmiClient !== null) {
      tmiClient.connect()
    }
  }, [tmiClient])

  const handleLoadUser = async () => {
    const storageToken = localStorage.getItem("@token");
    if (storageToken && !passedBy) {
      const values = JSON.parse(storageToken)
      const validation = await validate(values.access_token);

      if (validation.status === 401) {
        alert("Sua twitch foi desconectada. Faça login novamente para recuperar o acesso!")
        return;
      }

      const user = await getUser(values.access_token, validation.login);

      const userFollowedChannels = await checkFollowsIf(values.access_token, user.id);

      if (userFollowedChannels.length === 0) {
        playAlert();
      }

      window.location.href.replace(window.location.hash, "").replace("#", "")
      window.location.hash = ""

      const client = new tmi.Client({
        connection: {
          reconnect: true,
        },
        identity: {
          username: user.login,
          password: values.access_token,
        },
        channels: [
          'batera',
          'colonogamer'
        ],
        options: {
          // debug: true,
          // messagesLogLevel: 'warn', // "info, warn, error, fatal"
          skipUpdatingEmotesets: true
        }
      });

      setTmiClient(client)

      setToken(values)
      setUser({ ...user, follows: userFollowedChannels })
      setIsLogged(true)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!passedBy) {
        const splitted = window.location.hash.replace("#", "&").split("&")
        splitted.shift()
        let values = {}
        for (const variable of splitted) {
          const xpto = variable.replaceAll("&", "").split("=")
          values[xpto[0]] = xpto[1]
        }

        if (Object.keys(values).length > 0) {
          localStorage.setItem("@token", JSON.stringify(values))
        }

        handleLoadUser();
        setPassedBy(true)
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [passedBy]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLogged,
        handleSignInTwitch,
        handleLogout,
        sendCommand,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}