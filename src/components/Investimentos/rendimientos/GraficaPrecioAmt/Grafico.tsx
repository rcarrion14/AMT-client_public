import React from "react";
//import TradingViewWidget from "../../../TradingViewWidget";

interface GraficoInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Grafico: React.FC<GraficoInterface> = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
    </div>
  );
};

export default Grafico;
