import React from "react";
import { format } from "../coinFormater";

interface cuadroCobroProps {
  balanceOfAt: number | undefined;
  payAt: number | undefined;
  totalSupplyAt: number | undefined;
  currentSnap: number;
}
const CuadroCobro: React.FC<cuadroCobroProps> = ({
  balanceOfAt,
  payAt,
  totalSupplyAt,
  currentSnap,
}) => {
  return (
    <div className="cuadroCobro">
      <img className="activeIcon" src="arrow-down.png" alt="" />

      <div className="transparente">
        <p>13/04/2023 - {currentSnap}</p>
        <p className="aCobrar">
          BTC a cobrar: {(payAt * balanceOfAt) / totalSupplyAt}
        </p>
        <p>Distribucion: {payAt}</p>
      </div>

      <button>Cobrar</button>
    </div>
  );
};

export default CuadroCobro;
