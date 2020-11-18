import React, { useEffect } from "react";
import Lang from "./Lang";
import useLocalStorage from "../../../store/useLocalStorage";
const langList = [
  { id: 1, lang: "cn", name: "简中" },
  { id: 2, lang: "en", name: "English" },
  { id: 3, lang: "tw", name: "印尼 (Indonesian)" },
  // "setting.Indonesian": "印尼 (Indonesian)",
  // "setting.English": "English",
  // "setting.China": "简中",
];
function Context(props) {

  const [lang, setLang] = useLocalStorage("lang", 1);

  const CHANG_LANG = (id) => {
    setLang(id);
  };
  const GET_LANG = () => {
    return parseInt(window.localStorage.getItem("lang"), 10);
  };
  const contextValue = {
    lang,
    langList,
    GET_LANG,
    CHANG_LANG,
  };
  return <Lang.Provider value={contextValue}>{props.children}</Lang.Provider>;
}

export default Context;
