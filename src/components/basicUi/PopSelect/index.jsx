import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import PropType from "prop-types";
import { useTranslation } from "react-i18next";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import ListItemText from "@material-ui/core/ListItemText";

import "./style.scss";

const useStyles = makeStyles({
  list: {
    width: "100vw",
    backgroundColor: "white",
  },
  root: {
    fontSize: "14px",
  },
  fullList: {
    width: "auto",
  },
});

const drawerStyle = makeStyles({
  paper: {
    borderRadius: "10px 10px 0 0",
  },
  root: {
    width: "100vw",
  },
});

export default function TemporaryDrawer(props) {
  const {
    label,
    errorMsg,
    onChange,
    placeholder,
    items,
    value,
    anchor,
    renderLeft,
    renderRight,
  } = props;
  const { t } = useTranslation();
  const [showDrawer, toggleDrawer] = useState(false);
  const [nowValue, setNowValue] = useState(
    items.find((item) => value == item.value) || ""
  );

  const classes = useStyles();
  const drawerClass = drawerStyle();
  const list = () => (
    <div
      className={
        (clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        }),
        "popUpGender")
      }
      role="presentation"
    >
      {items.map((item, index) => (
        <div key={index}>
          <List
            style={{ textAlign: "center" }}
            onClick={() => {
              setNowValue(item);
              toggleDrawer(false);
            }}
          >
            <ListItemText primary={item.text ? item.text : item} />
          </List>
          <Divider classes={{ root: drawerStyle.root }} />
        </div>
      ))}
       {/* 給取消的空位置(兩個List) +br*/}
       <List></List>
      <List></List>
      <br></br>
      {/* 至此 */}
      <Divider />
      <Divider />
      <List
         style={{ textAlign: "center", color: "#fe2a6d", position:"fixed",bottom:"0px",left:"0",background:"white",width:"100%"}}
        onClick={() => toggleDrawer(!showDrawer)}
      >
        <ListItemText primary={t('normal.cancel')} />
      </List>
    </div>
  );
  const selectLeft = () => {
    return (
      <div className={renderLeft ? "p-ui__select-context-afert" : ""}>
        {renderLeft ? renderLeft() : ""}
      </div>
    );
  };
  const selectRight = () => {
    return (
      <div className={renderRight ? "p-ui__select-context-before" : ""}>
        {renderRight ? renderRight() : ""}
      </div>
    );
  };
  useEffect(() => {
    changeHandler();
  }, [nowValue]);
  const changeHandler = () => {
    onChange(
      nowValue.value || nowValue.value === 0 ? nowValue.value : nowValue
    );
  };

  return (
    <div className="p-ui__select">
      <p>{label}</p>
      <div
        className="p-ui__select-context"
        onClick={() => {
          toggleDrawer(!showDrawer);
        }}
      >
        {renderLeft ? selectLeft() : <></>}
        <input
          type="text"
          value={nowValue.text ? nowValue.text : nowValue}
          readOnly
          placeholder={placeholder}
        />
        {renderRight ? selectRight() : <></>}
      </div>
      <span className="p-ui-errormsg__select">{errorMsg}</span>
      {renderLeft ? renderLeft() : ""}
      <Drawer
        classes={{ paper: drawerClass.paper }}
        className="popUpMsenu"
        anchor={anchor}
        open={showDrawer}
        onClose={() => {
          toggleDrawer(!showDrawer);
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
}

TemporaryDrawer.propTypes = {
  onChange: PropType.func,
  label: PropType.string,
  rules: PropType.arrayOf(PropType.func),
  errorMsg: PropType.any,
  placeholder: PropType.string,
  value: PropType.any,
  valueChange: PropType.func,
  anchor: PropType.string,
  renderLeft: PropType.func,
  renderRight: PropType.func,
};

TemporaryDrawer.defaultProp = {
  anchor: "bottom",
  renderLeft: () => <></>,
};
