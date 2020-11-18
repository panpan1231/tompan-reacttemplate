import React, { useContext } from "react";
import AuthInfo from "./AuthInfo";
import useLocalStorage from "../../../store/useLocalStorage";
import { apiGetUserInfo } from "../../../apis/api";
import { LangContext } from "../../index";

function Context(props) {
  const { lang } = useContext(LangContext);
  const [{ userInfo }, setUser] = useLocalStorage("startask", {
    userInfo: {
      user: "",
    },
  });
  const [token, setToken] = useLocalStorage("token");
  const SET_USER = (obj) => {
    setUser({
      userInfo: { user: obj },
    });
  };
  const SET_TOKEN = (token) => {
    setToken(token);
  };
  const UPDATE_USER_INFO = () => {
    apiGetUserInfo({
      lang: lang,
    }).then((res) => {
      setUser({
        userInfo: {
          user: res.data.data,
        },
      });
    });
  };
  const contextValue = {
    ...userInfo,
    SET_USER,
    SET_TOKEN,
    UPDATE_USER_INFO,
  };

  return (
    <AuthInfo.Provider value={contextValue}>{props.children}</AuthInfo.Provider>
  );
}

export default Context;
