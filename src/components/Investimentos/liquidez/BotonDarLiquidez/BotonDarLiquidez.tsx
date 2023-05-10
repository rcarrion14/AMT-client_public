// @ts-nocheck

import React from "react";
import "./BotonDarLiquidez.css";
import { textosExtra, interfaceTextoExtra } from "../../../../Utils/textos";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { amtOperations } from "../../../../store/features/amt/amtOperations";
import { btcbOperations } from "../../../../store/features/btcb/btcbOperations";
import { masterOperations } from "../../../../store/features/master/masterOperations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ethers } from "ethers";
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
  setAlertaAlDepositar,
}) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const dispatch = useDispatch<AppDispatch>();

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
          <div className="doubleButtonContainer">
            <button
              className={allowanceAmt > inputAmt ? "inactive" : null}
              onClick={() => {
                amtOperations.approveMaster(dispatch);
              }}
            >
              {allowanceAmt < inputAmt
                ? textosExtra[currentLanguage].aprobarAMT
                : inputAmt > balanceAmt
                ? textosExtra[currentLanguage].bceAmtInsuficiente
                : "AMT aprobado"}
            </button>
            <button
              className={allowanceBtc > inputBtc ? "inactive" : null}
              onClick={() => {
                btcbOperations.approveMaster(dispatch);
              }}
            >
              {allowanceBtc < inputBtc
                ? textosExtra[currentLanguage].aprobarBTCB
                : inputBtc > balanceBtc
                ? textosExtra[currentLanguage].bceBtcInsuficiente
                : "BTCB aprobado"}
            </button>
          </div>
        ) : (
          <button
            className="btnLarge"
            onClick={() => {
              setAlertaAlDepositar(true);
              masterOperations.addLiquidity(
                dispatch,
                ethers.utils.parseEther(inputAmt.toFixed(15)),
                ethers.utils.parseEther(inputBtc.toFixed(15))
              );
            }}
          >
            {textosExtra[currentLanguage].proveerLiquidez}
          </button>
        )
      }
    </>
  );
};

export default BotonDarLiquidez;
