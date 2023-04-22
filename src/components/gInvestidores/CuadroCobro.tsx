import React from "react";

const CuadroCobro = () => {
  return (
    <div className="cuadroCobro">
      <img className="activeIcon" src="arrow-down.png" alt="" />

      <div className="transparente">
        <p>13/04/2023</p>
        <p className="aCobrar">BTC a cobrar: 0.000365</p>
        <p>Distribucion</p>
      </div>

      <button>Cobrar</button>
    </div>
  );
};

export default CuadroCobro;
