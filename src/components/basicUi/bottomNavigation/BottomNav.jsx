import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    props.router.current.history.push(`/${newValue}`);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        showLabel={true}
        label="home"
        value="Home"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        showLabel={true}
        label="help"
        value="Help"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        showLabel={true}
        label="Home"
        value="Home"
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
  );
}
