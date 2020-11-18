import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import HexagonAvatar from "../../components/HexagonAvatar";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import { useTranslation } from "react-i18next";

import { useTheme } from "@material-ui/core/styles";

import EditIcon from "../../assets/images/layout/edit.png";
import SetupIcon from "../../assets/images/layout/setup.png";

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
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    padding: "18px 10px",
    boxShadow: "none",
    height: "15vh",
  },

  userInfo: {
    flexGrow: 1,
    // display: "flex",
    padding: "0 10px",
  },
  userName: {
    fontSize: theme.fontSetting.large,
    textAlign: "start",
  },
  userLevel: {
    marginTop: 5,
    fontSize: theme.fontSetting.small,
    color: "white",
    display: "flex",
    alignItems: "flex-end",
    textAlign: "start",
  },
}));

function DefaultAppBar(props) {
  const {
    nickname,
    userId,
    notificationsHadler,
    noticeNum,
    editHandler,
    settingHandler,
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const mineButtomStyle = {
    width: "34px",
    height: "34px",
    marginRight: "5px",
  };
  return (
    <AppBar
      color="primary"
      position="sticky"
      className={classes.appBar}
      style={{ height: "90px", padding: "18px 10px 18px 10px" }}
    >
      <Toolbar>
        <HexagonAvatar> </HexagonAvatar>
        <div className={classes.userInfo}>
          <div className={classes.userName}>
            {t("normal.hello")}，{nickname}
          </div>
          <div className={classes.userLevel}>
            <span
              style={{
                marginRight: 10,
                opacity: 0.4,
                fontSize: theme.fontSetting.normal,
              }}
            >
              {t("help.member")}ID: {userId}
            </span>
          </div>
        </div>

        {window.location.pathname !== "/Mine" ? (
          <IconButton onClick={notificationsHadler}>
            <LayoutBadge badgeContent={noticeNum} color="secondary">
              <NotificationsOutlinedIcon
                fontSize="large"
                style={{ color: "white" }}
              ></NotificationsOutlinedIcon>
            </LayoutBadge>
          </IconButton>
        ) : (
          <div
            style={{
              // width: "30px",
              display: "flex",
              textAlign: "right",
            }}
          >
            <img
              src={EditIcon}
              onClick={editHandler}
              style={mineButtomStyle}
              alt="buttom"
            />
            <img
              src={SetupIcon}
              onClick={settingHandler}
              style={mineButtomStyle}
              alt="buttom"
            />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
DefaultAppBar.propTypes = {
  nickname: propTypes.string,
  userId: propTypes.number,
  notificationsHadler: propTypes.func,
  noticeNum: propTypes.number,
  editHandler: propTypes.func,
  settingHandler: propTypes.func,
};
export default DefaultAppBar;
