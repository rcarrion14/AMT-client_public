import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BotonDarLiquidez from "./BotonDarLiquidez/BotonDarLiquidez";
import { textosExtra } from "../../../Utils/textos";
import { ethers } from "ethers";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

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
      ? balanceOfPoolAmt.div(balanceOfPoolBtcb)
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
        ethers.utils.formatEther(
          ethers.utils.parseEther(event.target.value).div(ratioAmtBtcb)
        )
      );
    }
  };

  const handleInputBtcbValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (ratioAmtBtcb && parseFloat(event.target.value) >= 0) {
      setInputBtcbValue(event.target.value);
      setInputAmtValue(
        ethers.utils.formatEther(
          ethers.utils.parseEther(event.target.value).mul(ratioAmtBtcb)
        )
      );
    }
  };

  let parsedInputAmt;
  let parsedInputBtc;

  if (inputAmtValue !== "" && inputAmtValue !== "NaN") {
    parsedInputAmt = ethers.utils.parseEther(inputAmtValue);
  } else {
    parsedInputAmt = ethers.BigNumber.from(0);
  }

  if (inputBtcbValue !== "" && inputBtcbValue !== "NaN") {
    parsedInputBtc = ethers.utils.parseEther(inputBtcbValue);
  } else {
    parsedInputBtc = ethers.BigNumber.from(0);
  }

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo" style={{ display: "flex" }}>
          <p>
            {textosExtra[currentLanguage].saldo}{" "}
            {balanceAmt ? toFrontEndString(balanceAmt) : "-"}
          </p>
          <div className="boton100porcent">
            <button
              onClick={() => {
                if (balanceAmt && ratioAmtBtcb) {
                  setInputAmtValue(
                    ethers.utils.formatEther(
                      balanceAmt.sub(ethers.BigNumber.from("1"))
                    )
                  );
                  setInputBtcbValue(
                    ethers.utils.formatEther(
                      balanceAmt
                        .div(ratioAmtBtcb)
                        .sub(ethers.BigNumber.from("1"))
                    )
                  );
                }
              }}
              className="btnSimulacion transparente"
            >
              100%
            </button>
          </div>
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
      </div>
      <BotonDarLiquidez
        balanceAmt={balanceAmt}
        balanceBtc={balanceBtcb}
        inputAmtValue={
          inputAmtValue !== "" && inputAmtValue !== "NaN" ? inputAmtValue : "0"
        }
        inputBtcbValue={
          inputBtcbValue !== "" && inputBtcbValue !== "NaN"
            ? inputBtcbValue
            : "0"
        }
        allowanceAmt={allowanceAmt}
        allowanceBtc={allowanceBtcb}
        balanceLiqAmt={balanceLiqAmt}
        allowanceVault={allowanceVault}
      ></BotonDarLiquidez>

      <div className="containerPasos">
        <img className="activeIcon pasos" src="number-one.png" />
        <img src="right-arrow.png" alt="" className="inactiveIcon pasos" />
        <img
          src="number-two.png"
          className={
            allowanceAmt?.gt(parsedInputAmt) &&
            allowanceBtcb?.gt(parsedInputBtc)
              ? "activeIcon pasos"
              : "inactiveIcon pasos"
          }
        />
        <img src="right-arrow.png" alt="" className="inactiveIcon pasos" />
        <img
          src="number-three.png"
          className={
            balanceLiqAmt?.gt(ethers.BigNumber.from("0"))
              ? "activeIcon pasos"
              : "inactiveIcon pasos"
          }
        />
        <img src="right-arrow.png" alt="" className="inactiveIcon pasos" />
        <img
          src="number-four.png"
          className={
            allowanceVault &&
            balanceLiqAmt &&
            allowanceVault?.gt(balanceLiqAmt) &&
            balanceLiqAmt?.gt(ethers.BigNumber.from("0"))
              ? "activeIcon pasos"
              : "inactiveIcon pasos"
          }
        />
      </div>
    </>
  );
};

export default CuadroProveerLiquidez;
