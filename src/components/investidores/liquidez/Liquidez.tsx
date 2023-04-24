import React from "react";
import CuadroBimoneda from "../../CuadroBimoneda";
import { textoLiquidez } from "../../../textos";

interface LiquidezInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Liquidez: React.FC<LiquidezInterface> = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      {textoLiquidez("por")}
      <CuadroBimoneda />
    </div>
  );
};

export default Liquidez;
