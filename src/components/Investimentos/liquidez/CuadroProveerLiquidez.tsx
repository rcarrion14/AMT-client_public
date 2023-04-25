import React, { useRef } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BotonDarLiquidez from "./BotonDarLiquidez/BotonDarLiquidez";

const CuadroProveerLiquidez = () => {
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );
  const balanceBtcb = useSelector(
    (state: typeof RootState) => state.btcb.balance
  );

  const balanceLiqAmt = useSelector(
    (state: typeof RootState) => state.liqAmt.balance
  );

  const balanceOfPoolAmt = useSelector(
    (state: typeof RootState) => state.amt.balanceOfPool
  );

  const balanceOfPoolBtcb = useSelector(
    (state: typeof RootState) => state.btcb.balanceOfPool
  );

  //Gestion de los input
  const inputAmt = useRef<HTMLInputElement>(null);
  const inputBtcb = useRef<HTMLInputElement>(null);
  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <p>Saldo: {balanceAmt}</p>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining.png" />
          <div>AMT</div>
          <input
            ref={inputAmt}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={() => {}}
            value={undefined}
          />
        </div>
      </div>
      <div id="segundaSeccion">
        <div className="saldo">
          <p>Saldo: {balanceBtcb}</p>
        </div>
        <div className="cuadroCompra">
          <img src="coinBitcoin.png" alt="" />
          <div>BTCB</div>
          <input
            ref={inputBtcb}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={() => {}}
            value={undefined}
          />
        </div>
        <BotonDarLiquidez inputAmt={inputAmt}></BotonDarLiquidez>
      </div>
    </>
  );
};

export default CuadroProveerLiquidez;
