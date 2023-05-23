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
  console.log({ inputAmt, inputBtc });
  const parsedInputAmt = ethers.utils.parseEther(inputAmt.toString());
  const parsedInputBtc = ethers.utils.parseEther(inputBtc.toFixed(18));
  const noPuedeProveerLiquidez =
    !allowanceAmt ||
    !balanceAmt ||
    !allowanceBtc ||
    !balanceBtc ||
    allowanceAmt.lt(parsedInputAmt) ||
    balanceAmt.lt(parsedInputAmt) ||
    allowanceBtc.lt(parsedInputBtc) ||
    balanceBtc.lt(parsedInputBtc);

  return (
    <>
      {
        // Caso no puede proveer liquidez
        noPuedeProveerLiquidez ? (
          <div className="doubleButtonContainer">
            <button
              className={
                allowanceAmt && allowanceAmt.gt(parsedInputAmt)
                  ? "inactive"
                  : undefined
              }
              onClick={() => {
                amtOperations.approveMaster(dispatch);
              }}
            >
              {allowanceAmt?.lt(parsedInputAmt)
                ? textosExtra[currentLanguage].aprobarAMT
                : balanceAmt && balanceAmt.lt(parsedInputAmt)
                ? textosExtra[currentLanguage].bceAmtInsuficiente
                : "AMT aprobado"}
            </button>
            <button
              className={
                allowanceBtc?.gt(parsedInputBtc) ? "inactive" : undefined
              }
              onClick={() => {
                btcbOperations.approveMaster(dispatch);
              }}
            >
              {allowanceBtc?.lt(parsedInputBtc)
                ? textosExtra[currentLanguage].aprobarBTCB
                : balanceBtc?.lt(parsedInputBtc)
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
