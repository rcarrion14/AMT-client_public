// @ts-nocheck

import React from "react";
import CuadroQuema from "./CuadroQuema";
import { textoQuema } from "../../../Utils/textos";

const Quema = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoQuema("por")}
        <button className="btnLarge">Estatisticas</button>
        <CuadroQuema />
      </div>
    </div>
  );
};

export default Quema;
