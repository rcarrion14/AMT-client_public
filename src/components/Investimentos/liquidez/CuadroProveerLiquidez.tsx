// @ts-nocheck

import React, { useRef, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BotonDarLiquidez from "./BotonDarLiquidez/BotonDarLiquidez";
import { textosExtra } from "../../../Utils/textos";
import { ethers } from "ethers";

const CuadroProveerLiquidez = ({ setAlertaAlDepositar }) => {
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

  const ratioAmtBtcb =
    balanceOfPoolAmt !== undefined && balanceOfPoolBtcb !== undefined
      ? balanceOfPoolAmt / balanceOfPoolBtcb
      : undefined;

  //Gestion de los input
  const inputAmt = useRef<HTMLInputElement>(null);
  const inputBtcb = useRef<HTMLInputElement>(null);
  const [inputAmtValue, setInputAmtValue] = useState("");
  const [inputBtcbValue, setInputBtcbValue] = useState("");
  const handleInputAmtValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputAmtValue(event.target.value);
    setInputBtcbValue(
      (parseFloat(event.target.value) / ratioAmtBtcb).toString()
    );
  };

  const handleInputBtcbValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputBtcbValue(event.target.value);
    setInputAmtValue(
      (parseFloat(event.target.value) * ratioAmtBtcb).toString()
    );
  };
  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <p>
            {textosExtra[currentLanguage].saldo}{" "}
            {balanceAmt ? ethers.utils.formatEther(balanceAmt) : "-"}
          </p>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining.png" />
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
            {balanceBtcb ? ethers.utils.formatEther(balanceBtcb) : "-"}
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
        <BotonDarLiquidez
          balanceAmt={balanceAmt}
          balanceBtc={balanceBtcb}
          inputAmt={parseFloat(inputAmtValue)}
          inputBtc={parseFloat(inputBtcbValue)}
          allowanceAmt={allowanceAmt}
          allowanceBtc={allowanceBtcb}
          setAlertaAlDepositar={setAlertaAlDepositar}
        ></BotonDarLiquidez>
      </div>
    </>
  );
};

export default CuadroProveerLiquidez;
