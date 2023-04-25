import React from "react";
import "./BotonDarLiquidez.css";
import { textosExtra, interfaceTextoExtra } from "../../../../Utils/textos";
interface BotonDarLiquidezProps {
  balanceAmt: number;
  balanceBtc: number;
  allowanceAmt: number;
  allowanceBtc: number;
  inputAmt: number;
  inputBtc: number;
}
const BotonDarLiquidez: React.FC<BotonDarLiquidezProps> = ({
  balanceAmt,
  balanceBtc,
  allowanceAmt,
  allowanceBtc,
  inputAmt,
  inputBtc,
}) => {
  const lenguaje = "por"; // Pensar cambio dinamico

  const textos: interfaceTextoExtra = textosExtra[lenguaje];
  return (
    <div className="double-button-wrapper">
      <button
        className="double-button-left"
        onClick={() => {
          console.log("click1");
        }}
      >
        {textos.aprobarAMT}
      </button>
      <button
        className="double-button-right"
        onClick={() => {
          console.log("click2");
        }}
      >
        {textos.aprobarBTCB}
      </button>
    </div>
  );
};

export default BotonDarLiquidez;
