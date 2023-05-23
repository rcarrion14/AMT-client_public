import React from "react";
import "./BotonDarLiquidez.css";
import { textosExtra } from "../../../../Utils/textos";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { amtOperations } from "../../../../store/features/amt/amtOperations";
import { btcbOperations } from "../../../../store/features/btcb/btcbOperations";
import { masterOperations } from "../../../../store/features/master/masterOperations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ethers, BigNumber } from "ethers";
interface BotonDarLiquidezProps {
  balanceAmt: BigNumber | undefined;
  balanceBtc: BigNumber | undefined;
  allowanceAmt: BigNumber | undefined;
  allowanceBtc: BigNumber | undefined;
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
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const dispatch = useDispatch<AppDispatch>();

  const noPuedeProveerLiquidez =
    !allowanceAmt ||
    !balanceAmt ||
    !allowanceBtc ||
    !balanceBtc ||
    allowanceAmt.lt(inputAmt) ||
    balanceAmt.lt(inputAmt) ||
    allowanceBtc.lt(inputBtc) ||
    balanceBtc.lt(inputBtc);

  return (
    <>
      {
        // Caso no puede proveer liquidez
        noPuedeProveerLiquidez ? (
          <div className="doubleButtonContainer">
            <button
              className={
                allowanceAmt && allowanceAmt.gt(inputAmt)
                  ? "inactive"
                  : undefined
              }
              onClick={() => {
                amtOperations.approveMaster(dispatch);
              }}
            >
              {allowanceAmt?.lt(inputAmt)
                ? textosExtra[currentLanguage].aprobarAMT
                : balanceAmt && balanceAmt.lt(inputAmt)
                ? textosExtra[currentLanguage].bceAmtInsuficiente
                : "AMT aprobado"}
            </button>
            <button
              className={allowanceBtc?.gt(inputBtc) ? "inactive" : undefined}
              onClick={() => {
                btcbOperations.approveMaster(dispatch);
              }}
            >
              {allowanceBtc?.lt(inputBtc)
                ? textosExtra[currentLanguage].aprobarBTCB
                : balanceBtc?.lt(inputBtc)
                ? textosExtra[currentLanguage].bceBtcInsuficiente
                : "BTCB aprobado"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
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
