import React from "react";
import TradingViewWidget from "../../../TradingViewWidget";

const Grafico = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
        <TradingViewWidget />
      </div>
    </div>
  );
};

export default Grafico;
