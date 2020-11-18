import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import { useTranslation } from "react-i18next";

import { useTheme } from "@material-ui/core/styles";

import propTypes from "prop-types";

const LayoutBadge = withStyles((theme) => ({
  badge: {
    right: 5,
    top: 10,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  textAppBar: {
    background: theme.palette.primary.light,
    boxShadow: "none",
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },
}));

function TextAppBar(props) {
  const { title, leftHandler } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <AppBar color="primary" position="sticky" className={classes.textAppBar}>
      <Toolbar style={{ padding: "0px" }}>
        <div style={{ flex: 1, textAlign: "start" }} className="appbar-right">
          <IconButton onClick={leftHandler}>
            <NavigateBeforeRoundedIcon
              // fontSize="small"
              style={{ color: "white" }}
            ></NavigateBeforeRoundedIcon>
          </IconButton>
        </div>
        <div style={{ flex: 1, textAlign: "center" }} className="appbar-center">
          {t(`${title}`)}
        </div>
        <div style={{ flex: 1 }} className="appbar-left"></div>
      </Toolbar>
    </AppBar>
  );
}
TextAppBar.propTypes = {
  title: propTypes.string,
  leftHandler: propTypes.func,
};
export default TextAppBar;
