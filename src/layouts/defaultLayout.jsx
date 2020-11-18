import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import "./layout.scss";
import ContextHandler, { LangContext, AuthInfoContext } from "../context";
import AppBar from "../components/basicUi/appBar/AppBar";
import BottomNav from "../components/basicUi/bottomNavigation/BottomNav";
function Layout(props) {
  console.log(props);
  return (
    <div
      id="startask-layout"
      className="startask-layout"
      style={{ overflow: "visible" }}
    >
      <AppBar />
      <div className="content">{props.children}</div>
      <BottomNav {...props} />
    </div>
  );
}

export default Layout;
