import React from "react";
import "./BotonDarLiquidez.css";
import { textosExtra, interfaceTextoExtra } from "../../../../Utils/textos";
import { amtOperations } from "../../../../store/features/amt/amtOperations";
import { btcbOperations } from "../../../../store/features/btcb/btcbOperations";
import { masterOperations } from "../../../../store/features/master/masterOperations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
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
  const dispatch = useDispatch<AppDispatch>();

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
                amtOperations.approveMaster(dispatch);
              }}
              disabled={inputAmt > balanceAmt && allowanceAmt >= inputAmt}
            >
              {allowanceAmt < inputAmt
                ? textos.aprobarAMT
                : inputAmt > balanceAmt
                ? textos.bceAmtInsuficiente
                : ""}
            </button>
            <button
              className="double-button-right"
              disabled={inputBtc > balanceBtc && allowanceBtc >= inputBtc}
              onClick={() => {
                btcbOperations.approveMaster(dispatch);
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
          <button
            className="btnLarge"
            disabled={Number.isNaN(inputAmt) || Number.isNaN(inputBtc)}
            onClick={() => {
              masterOperations.addLiquidity(dispatch, inputAmt, inputBtc);
            }}
          >
            {textos.proveerLiquidez}
          </button>
        )
      }
    </>
  );
};

export default BotonDarLiquidez;
