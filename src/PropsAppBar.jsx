import React from "react";
import { Link } from "react-router-dom";
import logo from "./imgs/CMYK-Red-Black_Small_GeneralAssembly-Stacked.png";

const PropsAppBar = (props) => {
  return (
    <div className="PropsAppBar" style={{ display: "flex" }}>
      <img className="GaLogo1" src={logo} alt="Logo" />
      <Link to="/home">
        <button className="NavButton NavButton1">Home</button>
      </Link>
      <Link to="/profile">
        <button className="NavButton">Profile</button>
      </Link>
      <Link to="/community">
        <button className="NavButton">Community</button>
      </Link>
      <Link to="/setup">
        <button className="NavButton">Setup</button>
      </Link>
      <Link to="/chat">
        <button className="NavButton">Chat</button>
      </Link>
      <Link to="/square">
        <button className="NavButton">Town Square</button>
      </Link>
      <Link to="/">
        <button className="NavButton" onClick={props.logout}>
          {" "}
          Logout{" "}
        </button>
      </Link>
    </div>
  );
};

export default PropsAppBar;
