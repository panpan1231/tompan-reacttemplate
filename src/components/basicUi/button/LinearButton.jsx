import React from "react";
import Button from "@material-ui/core/Button";
import "./styles.scss";
const LinearButton = ({
  title,
  onClick,
  width,
  height,
  bgColor,
  fontColor = true,
  elevation = false,
}) => {
  const type = {
    default: "linear-gradient(to right, #f82a6d 0%, #f84a46 100%)",
    red: "linear-gradient(to right, #FF71D2, #9900E1)",
    yellow: "linear-gradient(to right, #ff8300 0%, #ff3700 100%)",
    blue: "linear-gradient(to left, #0555f5 0%, #23d2ff 100%)",
    gold: "linear-gradient(to left, #ffc954 0%, #ffefb6 100%)",
    silver: "linear-gradient(to left, #7e98bb 0%, #e0e8f5 100%)",
    copper: "linear-gradient(to left, #c49175 0%, #f2c9ad 100%)",
    purple: "linear-gradient(to left, #918bd8 0%, #e6e4fd 100%)",
    disable: "linear-gradient(to left, #1b1969 0%, #1b1969 100%)",
  };

  return (
    <Button
      disableElevation={elevation}
      className="buttonFormat"
      style={{
        width: width,
        height: height,
        color: !!fontColor ? "white" : "#2a2a2a",
        fontWeight: !fontColor ? "bolder" : "",
        backgroundImage: type[bgColor],
      }}
      variant="contained"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default LinearButton;
