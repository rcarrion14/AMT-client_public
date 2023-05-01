import React from "react";
import { textoLiquidez, textosExtra } from "../../../Utils/textos";
import CuadroProveerLiquidez from "./CuadroProveerLiquidez";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { current } from "@reduxjs/toolkit";
interface LiquidezInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Liquidez: React.FC<LiquidezInterface> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>{textosExtra[currentLanguage].inversiones}</h1>
      </div>
      {textoLiquidez(currentLanguage)}
      <CuadroProveerLiquidez />
    </div>
  );
};

export default Liquidez;
