import React, { useState } from "react";
import CuadroPancake from "./CuadroPancake";
import { textoPancake } from "../../../Utils/textos";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
interface PancakeSwapInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const PancakeSwap: React.FC<PancakeSwapInterface> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoPancake(currentLanguage)}
        <CuadroPancake />
      </div>
    </div>
  );
};

export default PancakeSwap;
