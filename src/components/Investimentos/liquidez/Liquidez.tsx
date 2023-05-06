import React, { useState } from "react";
import { textoLiquidez, textosExtra } from "../../../Utils/textos";
import CuadroProveerLiquidez from "./CuadroProveerLiquidez";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { current } from "@reduxjs/toolkit";
import RetirarLiquidez from "../retirarLiquidez/RetirarLiquidez";
interface LiquidezInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Liquidez: React.FC<LiquidezInterface> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const [selectorDarLiq, setSelectorDarLiquidez] = useState(true);
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>{textosExtra[currentLanguage].inversiones}</h1>
      </div>
      {textoLiquidez(currentLanguage)}
      <div className="botonesSimuladorStaking">
        <button
          onClick={() => {
            setSelectorDarLiquidez(true);
          }}
          className={selectorDarLiq ? "active" : undefined}
        >
          {textosExtra[currentLanguage].proveerLiquidez}
        </button>
        <button
          onClick={() => {
            setSelectorDarLiquidez(false);
          }}
          className={selectorDarLiq ? undefined : "active"}
        >
          {textosExtra[currentLanguage].tuLiquidezYRetirar}
        </button>
      </div>
      {selectorDarLiq ? <CuadroProveerLiquidez /> : <RetirarLiquidez />}
    </div>
  );
};

export default Liquidez;
