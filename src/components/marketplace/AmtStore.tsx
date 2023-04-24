import React from "react";
import CuadroBimoneda from "../CuadroBimoneda";
import { textoStore } from "../../textos";

interface AmtStoreInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const AmtStore: React.FC<AmtStoreInterface> = ({ setActivePage }) => {
  console.log("Store");
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("marketplace")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoStore("por")}
        <CuadroBimoneda />
      </div>
    </div>
  );
};

export default AmtStore;
