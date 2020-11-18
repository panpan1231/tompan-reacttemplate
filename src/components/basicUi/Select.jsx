import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PropTypes from "prop-types";

/*
props:

title

ItemList

err:onclick
*/
const StyledMenu = withStyles({
  paper: {
    border: "none",
    background: "#fe2a6d",
    color: "#ffffff",
    left: "0px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      background: "#ffffff",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "#fe2a6d",
      },
    },
  },
}))(MenuItem);

export default function Select({
  title = "未設定",
  ItemList = [1, 2, 3],
  defaultSelect = null,
  selectedVal,
  changeFunc,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelect] = React.useState(defaultSelect);
  useEffect(() => {
    setSelect(defaultSelect);
  }, [defaultSelect]);
  let listRef = React.createRef();
  const handleClick = (event) => {
    //console.log(listRef.current);
    setAnchorEl(listRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    //console.log(event.currentTarget.dataset);
    const name = event.currentTarget.dataset.myValue;
    changeFunc(name);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        ref={listRef}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f82a6d 0%, #f84a46 100%)",
          display: "flex",

          justifyContent: "space-between",
          color: "#ffffff",
          width: "45vw",
        }}
        onClick={handleClick}
      >
        {!!selectedVal ? selectedVal : defaultSelect}
        <KeyboardArrowDownIcon />
      </Button>
      <StyledMenu
        value={setSelect}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ left: "0px" }}
      >
        {ItemList.map((item) => (
          <StyledMenuItem
            key={item}
            data-my-value={item}
            onClick={handleChange}
          >
            <ListItemText value={item} primary={item} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}

Select.prototype = {
  title: PropTypes.string,
  ItemList: PropTypes.array,
};
