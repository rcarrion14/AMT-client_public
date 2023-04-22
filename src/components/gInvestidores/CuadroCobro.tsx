import React from "react";
import { format } from "../coinFormater";

interface cuadroCobroProps {
  balanceOfAt: string | null;
  payAt: string | null;
  totalSupplyAt: string | null;
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
          BTC a cobrar:{" "}
          {parseFloat(format(payAt)) *
            (parseFloat(format(balanceOfAt)) /
              parseFloat(format(totalSupplyAt)))}
        </p>
        <p>Distribucion: {format(payAt)}</p>
      </div>

      <button>Cobrar</button>
    </div>
  );
};

export default CuadroCobro;
