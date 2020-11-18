import React, { useState, useEffect } from "react";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useTheme } from "@material-ui/core/styles";
import "./style.scss";
/*
status: 0:NO img, 1:success, 2:fail
display: false: hide, true:show
msg: String
*/

const Alert = ({ status, display, msg }) => {
  const theme = useTheme();
  const alert = {
    color: theme.palette.white.light,
    backgroundColor: theme.palette.fade.light,
    fontSize: theme.fontSetting.normal,
  };
  useEffect(() => {}, [display]);

  return (
    <div
      className="alert"
      style={{ display: display ? "block" : "none", ...alert }}
    >
      {status == 1 ? (
        <CheckCircleSharpIcon
          style={{
            fontSize: 45,
            color: theme.palette.green.light,
            marginTop: "15px",
            marginBottom: "15px",
          }}
        />
      ) : status == 2 ? (
        <CancelRoundedIcon
          style={{
            fontSize: 45,
            color: theme.palette.status.fail,
            marginTop: "15px",
            marginBottom: "15px",
            marginRight: "0",
          }}
        />
      ) : (
        ""
      )}

      <p style={{ padding: "15px" }}>{msg}</p>
    </div>
  );
};

export default Alert;
