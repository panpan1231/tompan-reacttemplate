import React from "react";

import AuthInfo from "./module/AuthInfo";
import Lang from "./module/Lang";

import AuthInfoContext from "./module/AuthInfo/AuthInfo";
import LangContext from "./module/Lang/Lang";

const ContextList = [
  { name: "AuthInfo", context: AuthInfo },
  { name: "Lang", context: Lang },
];

function Context(props) {
  let output = props.children;
  ContextList.forEach((contextInfo) => {
    output = <contextInfo.context>{output}</contextInfo.context>;
  });
  return output;
}

export { AuthInfoContext, LangContext };

export default Context;
