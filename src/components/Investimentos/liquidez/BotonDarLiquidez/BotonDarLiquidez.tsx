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
  const noPuedeProveerLiquidez =
    allowanceAmt < inputAmt ||
    inputAmt > balanceAmt ||
    allowanceBtc < inputBtc ||
    inputBtc > balanceBtc;
  return (
    <>
      {
        // Caso no puede proveer liquidez
        noPuedeProveerLiquidez ? (
          <div className="double-button-wrapper">
            <button
              className="double-button-left"
              onClick={() => {
                console.log("click1");
              }}
            >
              {allowanceAmt < inputAmt
                ? textos.aprobarAMT
                : inputAmt > balanceAmt
                ? textos.bceAmtInsuficiente
                : ""}
            </button>
            <button
              className="double-button-right"
              onClick={() => {
                console.log("click2");
              }}
            >
              {allowanceBtc < inputBtc
                ? textos.aprobarBTCB
                : inputBtc > balanceBtc
                ? textos.bceBtcInsuficiente
                : ""}
            </button>
          </div>
        ) : (
          //Caso puede proveer liquidez
          <button className="btnLarge">{textos.proveerLiquidez}</button>
        )
      }
    </>
  );
};

export default BotonDarLiquidez;
