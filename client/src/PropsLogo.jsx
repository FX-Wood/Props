import React from "react";
import logo from "./imgs/CMYK-Red-Black_Small_GeneralAssembly-Stacked.png";

const PropsLogo = (props) => {
  return (
    <React.Fragment>
      <h1 className="PropsLogoText">Props</h1>
      {/* <h3 className="PropsLogoText2">for</h3> */}
      <img className="GaLogo" src={logo} alt="Logo" />
    </React.Fragment>
  );
};

export default PropsLogo;
