import React, { useRef, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BotonDarLiquidez from "./BotonDarLiquidez/BotonDarLiquidez";
import { textosExtra } from "../../../Utils/textos";
import { ethers } from "ethers";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import { vaultBtcbLiquidityOperations } from "../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { liqAmtOperations } from "../../../store/features/liqAmt/liqAmtOperations";
import { amtOperations } from "../../../store/features/amt/amtOperations";
import { btcbOperations } from "../../../store/features/btcb/btcbOperations";
import { masterOperations } from "../../../store/features/master/masterOperations";
const CuadroProveerLiquidez = () => {
  const dispatch = useDispatch<AppDispatch>();
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );
  const balanceBtcb = useSelector(
    (state: typeof RootState) => state.btcb.balance
  );

  const balanceLiqAmt = useSelector(
    (state: typeof RootState) => state.liqAmt.balance
  );

  const totalSupplyLiqAmt = useSelector(
    (state: typeof RootState) => state.liqAmt.totalSupply
  );

  const balanceOfPoolAmt = useSelector(
    (state: typeof RootState) => state.amt.balanceOfPool
  );

  const balanceOfPoolBtcb = useSelector(
    (state: typeof RootState) => state.btcb.balanceOfPool
  );

  const allowanceAmt = useSelector(
    (state: typeof RootState) => state.amt.allowanceMaster
  );

  const allowanceBtcb = useSelector(
    (state: typeof RootState) => state.btcb.allowanceMaster
  );

  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const balanceLiqAmtStaked = useSelector(
    (state: typeof RootState) => state.vaultBtcbLiquidity.balanceUserAmt
  );

  const allowanceVault = useSelector(
    (state: typeof RootState) => state.liqAmt.allowanceVaultBtcbLiq
  );

  const ratioAmtBtcb =
    balanceOfPoolAmt !== undefined && balanceOfPoolBtcb !== undefined
      ? parseFloat(balanceOfPoolAmt.toString()) /
        parseFloat(balanceOfPoolBtcb.toString())
      : undefined;

  //Gestion de los input
  const inputAmt = useRef<HTMLInputElement>(null);
  const inputBtcb = useRef<HTMLInputElement>(null);
  const [inputAmtValue, setInputAmtValue] = useState("");
  const [inputBtcbValue, setInputBtcbValue] = useState("");
  const handleInputAmtValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (ratioAmtBtcb && parseFloat(event.target.value) >= 0) {
      setInputAmtValue(event.target.value);
      setInputBtcbValue(
        (parseFloat(event.target.value) / ratioAmtBtcb).toString()
      );
    }
  };

  const handleInputBtcbValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (ratioAmtBtcb && parseFloat(event.target.value) >= 0) {
      setInputBtcbValue(event.target.value);
      setInputAmtValue(
        (parseFloat(event.target.value) * ratioAmtBtcb).toString()
      );
    }
  };
  const parsedInputAmt =
    inputAmtValue !== ""
      ? ethers.utils.parseEther(parseFloat(inputAmtValue).toFixed(18))
      : ethers.BigNumber.from(0);
  const parsedInputBtc =
    inputBtcbValue !== ""
      ? ethers.utils.parseEther(parseFloat(inputBtcbValue).toFixed(18))
      : ethers.BigNumber.from(0);

  const mensajeBotonLiquidezYStake = () => {
    //Caso donde debe proveer liquidez
    if (balanceLiqAmt && balanceLiqAmt.eq(0)) {
      return allowanceAmt && allowanceAmt.lt(parsedInputAmt)
        ? textosExtra[currentLanguage].aprobarAMT
        : allowanceBtcb && allowanceBtcb.lt(parsedInputBtc)
        ? textosExtra[currentLanguage].aprobarBTCB
        : balanceAmt && balanceAmt.lt(parsedInputAmt)
        ? textosExtra[currentLanguage].bceAmtInsuficiente
        : balanceBtcb && balanceBtcb.lt(parsedInputBtc)
        ? textosExtra[currentLanguage].bceBtcInsuficiente
        : textosExtra[currentLanguage].proveerLiquidez;
    }
    //Caso donde debe stakear
    else {
      return allowanceVault && balanceLiqAmt && allowanceVault.lt(balanceLiqAmt)
        ? textosExtra[currentLanguage].aprobar + " stake"
        : textosExtra[currentLanguage].stake;
    }
  };

  const operacionBotonDarLiquidezYStake = () => {
    //Caso donde debe proveer liquidez
    if (balanceLiqAmt && balanceLiqAmt.eq(0)) {
      return allowanceAmt && allowanceAmt.lt(parsedInputAmt)
        ? amtOperations.approveMaster(dispatch)
        : allowanceBtcb && allowanceBtcb.lt(parsedInputBtc)
        ? btcbOperations.approveMaster(dispatch)
        : masterOperations.addLiquidity(
            dispatch,
            parsedInputAmt,
            parsedInputBtc
          );
    }

    //Caso donde debe stakear
    else {
      return allowanceVault && balanceLiqAmt && allowanceVault.lt(balanceLiqAmt)
        ? liqAmtOperations.approveVaultBtcbLiq(dispatch)
        : balanceLiqAmt
        ? vaultBtcbLiquidityOperations.stake(dispatch, balanceLiqAmt)
        : null;
    }
  };
  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <p>
            {textosExtra[currentLanguage].saldo}{" "}
            {balanceAmt ? toFrontEndString(balanceAmt) : "-"}
          </p>
        </div>
        <div style={{marginLeft:"90%"}}>
          <button
            onClick={() => {
              if (balanceAmt && ratioAmtBtcb) {
                setInputAmtValue(ethers.utils.formatEther(balanceAmt));
                setInputBtcbValue(
                  (
                    parseFloat(ethers.utils.formatEther(balanceAmt)) /
                    ratioAmtBtcb
                  ).toString()
                );
              }
            }}
            className="btnSimulacion transparente"
          >
            100%
          </button>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining_.png" />
          <div>AMT</div>

          <input
            ref={inputAmt}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={handleInputAmtValueChange}
            value={inputAmtValue}
          />
        </div>
      </div>
      <div id="segundaSeccion">
        <div className="saldo">
          <p>
            {textosExtra[currentLanguage].saldo}
            {balanceBtcb ? toFrontEndString(balanceBtcb) : "-"}
          </p>
        </div>
        <div className="cuadroCompra">
          <img src="coinBitcoin.png" alt="" />
          <div>BTCB</div>
          <input
            ref={inputBtcb}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={handleInputBtcbValueChange}
            value={inputBtcbValue}
          />
          <div className="boton100porcent"></div>
        </div>

        <button
          className={
            balanceLiqAmtStaked && balanceLiqAmtStaked.gt(0)
              ? "gris"
              : undefined
          }
          onClick={operacionBotonDarLiquidezYStake}
        >
          {mensajeBotonLiquidezYStake()}
        </button>

        <div className="containerPasos">
          <img
            className={
              balanceLiqAmt && balanceLiqAmt.gt(0)
                ? "inactiveIcon pasos"
                : "activeIcon pasos"
            }
            src="number-one.png"
            alt=""
          />
          <img src="right-arrow.png" alt="" className="inactiveIcon pasos" />
          <img
            src="number-two.png"
            alt=""
            className={
              balanceLiqAmt && balanceLiqAmt.gt(0)
                ? "activeIcon pasos"
                : "inactiveIcon pasos"
            }
          />
        </div>
      </div>
    </>
  );
};

export default CuadroProveerLiquidez;
