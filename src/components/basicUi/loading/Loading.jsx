import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from "@material-ui/core/styles";
import "./style.scss";
/*
status: 0:NO img, 1:success, 2:fail
display: false: hide, true:show
msg: String
*/

const Loading = ({display, msg }) => {
  const [isShowLoading, setLoading] = useState(false);
  const theme = useTheme();
  const alert = {
    color: theme.palette.white.light,
    backgroundColor: theme.palette.fade.light,
    fontSize: theme.fontSetting.normal,
  };
  const loadingPage = {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "99999"
  }
  useEffect(() => {
    if(display) {
      setTimeout(function () {
        setLoading(true);
      }, 1500);
    }
    else {
      setLoading(false);
    }
  }, [display]);

  return (
    <div>
      {isShowLoading ? <div className="loadingPage" 
          style={{ width: "100vw", height: "100vh", position: "fixed", top: "0", background: "rgba(0,0,0,.3)", zIndex: "9999"}}>
        <div
          className="alert"
          style={{...alert }}
        >
            <CircularProgress/>
          <p style={{ padding: "15px" }}>{msg}</p>
        </div>
      </div> : ""}
    </div>
  );
};

export default Loading;
