import React, { useEffect } from "react";
import theme from "../../plugins/material";
import Logo from "../../assets/images/logo512.png";
const Home = (props) => {
  return (
    <div
      id="test"
      style={{
        height: "90vh",
        overflow: "scroll",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.primary.main,
      }}
    >
      <img
        className="animate__animated  animate__flip  animate__infinite"
        src={Logo}
        width="50%"
      />
    </div>
  );
};

export default Home;
