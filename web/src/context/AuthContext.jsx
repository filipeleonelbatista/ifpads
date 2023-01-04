
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const [isLogged, setIsLogged] = useState(false)

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
    const scope = "user:read:email user:read:follows user:read:subscriptions";

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

  useEffect(() => {
    const splitted = window.location.hash.replace("#", "&").split("&")
    splitted.shift()
    let values = {}
    for (const variable of splitted) {
      const xpto = variable.replaceAll("&", "").split("=")
      values[xpto[0]] = xpto[1]
    }

    const executeAsync = async () => {
      if (Object.keys(values).length > 0) {
        values.created_at = Date.now()
        const validation = await validate(values.access_token);

        if (validation.status === 401) {
          alert("Sua twitch foi desconectada. Faça login novamente para recuperar o acesso!")
          return;
        }

        const user = await getUser(values.access_token, validation.login);

        localStorage.setItem("@token", JSON.stringify(values))

        window.location.href.replace(window.location.hash, "").replace("#", "")
        window.location.hash = ""

        setToken(values)
        setUser(user)
        setIsLogged(true)

      } else {
        const token = localStorage.getItem("@token");

        if (token) {
          const values = JSON.parse(token)
          const validation = await validate(values.access_token);

          if (validation.status === 401) {
            alert("Sua twitch foi desconectada. Faça login novamente para recuperar o acesso!")
            return;
          }

          const updateUser = await getUser(values.access_token, validation.login);

          localStorage.setItem("@token", JSON.stringify(values))

          setToken(values)
          setUser(updateUser)
          setIsLogged(true)
        }
      }
    }
    executeAsync();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLogged,
        handleSignInTwitch,
        handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}