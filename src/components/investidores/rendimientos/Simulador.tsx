import React from "react";

const Simulador = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
    </div>
  );
};

export default Simulador;