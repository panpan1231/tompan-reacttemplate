import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import HelpCenterItem from "../../helpCenterItem/HelpCenterItem";
import TutorItem from "../../tutorItem/TutorItem";
import { useTheme } from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import "./style.scss";

const useStyles = makeStyles({
  list: {
    backgroundColor: "#12154a",
    color: "white",
    height: "80vh",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  root: {
    width: "100vw",
    backgroundColor: "#504eae",
    opacity: "0.6",
  },
  fullList: {
    width: "auto",
  },
});

export default function PopUpMenu({ title, detail, type, count, video }) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  let setHtml = () => {
    //console.log(document.getElementById("content"));
    document.getElementById("content").innerHTML = detail;
  };
  const toggleDrawer = (anchor, open) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setState({ ...state, [anchor]: open }, [setTimeout(setHtml, 100)]);
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          fontSize: theme.fontSetting.normal,
          width: "100vw",
          overflowWrap: "break-word",
          display: "flex",
          justifyContent: "space-around",
          lineHeight: "24px",
          paddingTop: "10px",
        }}
      >
        <div style={{ width: "80vw", overflowWrap: "break-word" }}>{title}</div>

        <div style={{ width: "24px" }}>
          <CloseRoundedIcon onClick={toggleDrawer("bottom", false)} />
        </div>
      </div>

      {/* <span style={{ fontSize: theme.fontSetting.normal, margin: "5px" }}>
        {title}
      </span>
      <CloseRoundedIcon style={{ float: "right" }} /> */}

      <Divider
        classes={{ root: classes.root }}
        style={{ width: "100%", marginBottom: "15px", marginTop: "15px" }}
      />
      {!!video ? (
        <div>
          <video controls width="100%" height="240">
            <source src={video} type="video/mp4"></source>
          </video>
        </div>
      ) : (
        ""
      )}

      <div
        className="content"
        id="content"
        style={{
          width: "100vw",
          fontSize: theme.fontSetting.middle,
          wordWrap: "break-word",
          whiteSpace: "break-spaces",
          fontWeight: "100",
          marginTop: "15px",
          boxSizing: "border-box",

          paddingLeft: "14px",
        }}
      >
        {detail}
      </div>
    </div>
  );

  return (
    <div>
      {type == "normal" ? (
        <HelpCenterItem msg={title} onClick={toggleDrawer("bottom", true)} />
      ) : (
        <TutorItem
          msg={title}
          count={count}
          onClick={toggleDrawer("bottom", true)}
        />
      )}

      <Drawer
        className="popUpMenu"
        anchor="bottom"
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>
    </div>
  );
}
