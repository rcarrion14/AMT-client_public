import React from "react";
import { textosExtra } from "../../../../Utils/textos";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { amtOperations } from "../../../../store/features/amt/amtOperations";
import { btcbOperations } from "../../../../store/features/btcb/btcbOperations";
import { masterOperations } from "../../../../store/features/master/masterOperations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ethers, BigNumber } from "ethers";
import { vaultBtcbLiquidityOperations } from "../../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";
import { liqAmtOperations } from "../../../../store/features/liqAmt/liqAmtOperations";

interface BotonDarLiquidezProps {
  balanceAmt: BigNumber | undefined;
  balanceBtc: BigNumber | undefined;
  allowanceAmt: BigNumber | undefined;
  allowanceBtc: BigNumber | undefined;
  balanceLiqAmt: BigNumber | undefined;
  allowanceVault: BigNumber | undefined;
  inputAmtValue: string;
  inputBtcbValue: string;
}
const BotonDarLiquidez: React.FC<BotonDarLiquidezProps> = ({
  balanceAmt,
  balanceBtc,
  allowanceAmt,
  allowanceBtc,
  inputAmtValue,
  inputBtcbValue,
  balanceLiqAmt,
  allowanceVault,
}) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const dispatch = useDispatch<AppDispatch>();
  const parsedInputAmt = ethers.utils.parseEther(inputAmtValue);
  const parsedInputBtc = ethers.utils.parseEther(inputBtcbValue);

  // Primero chequeamos si tiene tokens de liquidez. Si tiene vemos la aprobacion y que los deposite

  if (balanceLiqAmt?.gt(0)) {
    if (allowanceVault?.lt(balanceLiqAmt)) {
      return (
        <div className="singleButtonContainer">
          <button
            onClick={() => {
              liqAmtOperations.approveVaultBtcbLiq(dispatch);
            }}
          >
            {textosExtra[currentLanguage].aprobarLiqAmt}
          </button>
        </div>
      );
    }
    return (
      <div className="singleButtonContainer">
        <button
          onClick={() =>
            vaultBtcbLiquidityOperations.stake(dispatch, balanceLiqAmt)
          }
        >
          {textosExtra[currentLanguage].stake}
        </button>
      </div>
    );
  }

  // Si no tiene liq tokens, vemos la aprobacion que proveea liquidez

  if (allowanceAmt?.lt(parsedInputAmt) || allowanceBtc?.lt(parsedInputBtc)) {
    return (
      <div className="doubleButtonContainer">
        {/* Boton aprobar AMT */}
        {allowanceAmt?.gt(parsedInputAmt) ? (
          <button className="inactive">
            {textosExtra[currentLanguage].AMTAprobado}
          </button>
        ) : (
          <button
            onClick={() => {
              amtOperations.approveMaster(dispatch);
            }}
          >
            {textosExtra[currentLanguage].aprobarAMT}
          </button>
        )}

        {/* Boton aprobar BTC */}
        {allowanceBtc?.gt(parsedInputBtc) ? (
          <button className="inactive">
            {textosExtra[currentLanguage].BTCBAprobado}
          </button>
        ) : (
          <button
            onClick={() => {
              btcbOperations.approveMaster(dispatch);
            }}
          >
            {textosExtra[currentLanguage].aprobarBTCB}
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className="singleButtonContainer">
        <button
          onClick={() => {
            masterOperations.addLiquidity(
              dispatch,
              ethers.utils.parseEther(inputAmtValue),
              ethers.utils.parseEther(inputBtcbValue)
            );
          }}
        >
          {balanceAmt?.lt(parsedInputAmt)
            ? textosExtra[currentLanguage].bceAmtInsuficiente
            : balanceBtc?.lt(parsedInputBtc)
            ? textosExtra[currentLanguage].bceBtcInsuficiente
            : textosExtra[currentLanguage].proveerLiquidez}
        </button>
      </div>
    );
  }
};

export default BotonDarLiquidez;
