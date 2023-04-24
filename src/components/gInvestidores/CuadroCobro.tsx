import React from "react";
import { format } from "../coinFormater";

interface cuadroCobroProps {
  balanceOfAt: number | undefined;
  payAt: number | undefined;
  totalSupplyAt: number | undefined;
  currentSnap: number;
  alreadyCharged: boolean;
  charge: Function;
}
const CuadroCobro: React.FC<cuadroCobroProps> = ({
  balanceOfAt,
  payAt,
  totalSupplyAt,
  currentSnap,
  alreadyCharged,
  charge,
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

      <button onClick={charge} disabled={alreadyCharged || balanceOfAt == 0}>
        {alreadyCharged ? "ya cobrado" : "cobrar"}
      </button>
    </div>
  );
};

export default CuadroCobro;
