import React, { useState } from "react";
import { textoInterfaz1Inch, textoStore } from "../../../../Utils/textos";
import CuadroInterfaz1Inch from "./CuadroInterfaz1Inch";

interface Interfaz1InchInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const Interfaz1Inch: React.FC<Interfaz1InchInterface> = ({ setInterfaz }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setInterfaz(false)} src="icon_nav.png" />
        <h1>AMT Store</h1>
      </div>
      <div className="container">
        {textoInterfaz1Inch("por")}
        <CuadroInterfaz1Inch />
      </div>
    </div>
  );
};

export default Interfaz1Inch;
