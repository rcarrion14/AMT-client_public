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
  const mensajeBotonStake = () => {
    if (allowanceVault && balanceLiqAmt && allowanceVault.lt(balanceLiqAmt)) {
      return textosExtra[currentLanguage].aprobar;
    } else {
      return textosExtra[currentLanguage].stake;
    }
  };
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
    if (ratioAmtBtcb) {
      setInputAmtValue(event.target.value);
      setInputBtcbValue(
        (parseFloat(event.target.value) / ratioAmtBtcb).toString()
      );
    }
  };

  const handleInputBtcbValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (ratioAmtBtcb) {
      setInputBtcbValue(event.target.value);
      setInputAmtValue(
        (parseFloat(event.target.value) * ratioAmtBtcb).toString()
      );
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
        </div>
        <div className="doubleButtonContainer">
          <BotonDarLiquidez
            balanceAmt={balanceAmt}
            balanceBtc={balanceBtcb}
            inputAmt={inputAmtValue !== "" ? parseFloat(inputAmtValue) : 0}
            inputBtc={inputBtcbValue !== "" ? parseFloat(inputBtcbValue) : 0}
            allowanceAmt={allowanceAmt}
            allowanceBtc={allowanceBtcb}
          ></BotonDarLiquidez>
          <button
            className={
              balanceLiqAmt
                ? balanceLiqAmt.gt(0)
                  ? undefined
                  : "gris"
                : undefined
            }
            onClick={() => {
              allowanceVault &&
              balanceLiqAmt &&
              allowanceVault.gt(balanceLiqAmt)
                ? vaultBtcbLiquidityOperations.stake(dispatch, balanceLiqAmt)
                : liqAmtOperations.approveVaultBtcbLiq(dispatch);
            }}
          >
            {balanceLiqAmt ? mensajeBotonStake() : "Stake"}
          </button>
        </div>
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
