import React, { useState } from "react";
import CuadroAmtStore from "./CuadroAmtStore";
import { textoStore } from "../../../Utils/textos";
import Interfaz1Inch from "./Inch/Interfaz1Inch";

interface AmtStoreInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const AmtStore: React.FC<AmtStoreInterface> = ({ setActivePage }) => {
  const [interfaz, setInterfaz] = useState(false);
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("marketplace")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoStore("por")}
        <CuadroAmtStore />
        {interfaz ? <Interfaz1Inch setInterfaz={setInterfaz} /> : null}
      </div>

      <button onClick={() => setInterfaz(true)}>coso</button>
    </div>
  );
};

export default AmtStore;
