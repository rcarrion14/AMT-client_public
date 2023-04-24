import React from "react";
import { format } from "../coinFormater";
import { textosExtra } from "../../textos";

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
          {textosExtra.por.btcACobrar} {(payAt * balanceOfAt) / totalSupplyAt}
        </p>
        <p>
          {textosExtra.por.distribucion} {payAt}
        </p>
      </div>

      <button>{textosExtra.por.cobrar}</button>
    </div>
  );
};

export default CuadroCobro;
