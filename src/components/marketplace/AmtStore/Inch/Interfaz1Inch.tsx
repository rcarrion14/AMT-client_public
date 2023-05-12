// @ts-nocheck

import React, { useState } from "react";
import { textoInterfaz1Inch, textoStore } from "../../../../Utils/textos";
import CuadroInterfaz1Inch from "./CuadroInterfaz1Inch";
import { useSelector } from "react-redux";
interface Interfaz1InchInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const Interfaz1Inch: React.FC<Interfaz1InchInterface> = ({ setInterfaz }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <div className="cointainer1Inch noDeshabilitar">
      <div className="close1Inch">
        <h2>Seleccione moneda</h2>
        <img
          className="close"
          onClick={() => setInterfaz(false)}
          src="close.png"
        />
      </div>
      <div className="container">
        <CuadroInterfaz1Inch />
      </div>
      {/* <img src="1inch_logo.png" alt="" /> */}
    </div>
  );
};

export default Interfaz1Inch;
