import React, { useState } from "react";
import CuadroPancake from "./CuadroPancake";
import { textoPancake } from "../../../textos";

interface PancakeSwapInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const PancakeSwap: React.FC<PancakeSwapInterface> = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoPancake("por")}
        <CuadroPancake />
      </div>
    </div>
  );
};

export default PancakeSwap;
