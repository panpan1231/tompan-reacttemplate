import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useTheme } from "@material-ui/core/styles";
import "./style.scss";

const Alert = ({ status, msg }) => {
  const theme = useTheme();
  const [show, setShow] = useState(true);
  const alert = {
    color: "var(--white)",
    backgroundColor: "var(--fade)",
    fontSize: theme.fontSetting,
  };
  useEffect(() => {
    window.setTimeout(() => {
      setShow(false);
    }, 1000);
  }, []);
  return (
    <div
      className={
        "alert animate__animated animate__faster " +
        (show ? "animate__fadeIn" : "animate__fadeOut")
      }
      style={{ ...alert }}
    >
      {status == 1 ? (
        <CheckCircleSharpIcon
          style={{
            fontSize: 45,
            color: "var(--green)",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        />
      ) : status == 2 ? (
        <CancelRoundedIcon
          style={{
            fontSize: 45,
            color: "var(--secondary)",
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

const massageHandler = (msg, status) => {
  var newDIV = document.createElement("div");
  document.documentElement.appendChild(newDIV);

  ReactDOM.render(<Alert msg={msg} status={status}></Alert>, newDIV);
  window.setTimeout(() => {
    document.documentElement.removeChild(newDIV);
  }, 1500);
};

export default massageHandler;
