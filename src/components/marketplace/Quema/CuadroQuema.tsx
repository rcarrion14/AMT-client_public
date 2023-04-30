// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import BotonOperacionQuema from "./BotonOperacionQuema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { listaMonedas } from "../../../Utils/listaMonedas";
import { marketPlaceOperations } from "../../../store/features/marketplace/marketPlaceOperations";

//const stake = vaultBtcbOperations.stake;

// balance BTC
// balance AMT
// allowanceAMT
//tasa de cmabio

const CuadroPancake = () => {
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );

  const balanceBtcb = useSelector(
    (state: typeof RootState) => state.btcb.balance
  );

  /*   const burnPrice = useSelector(
    (state: typeof RootState) => state.marketPlace.getBackRate
  ); */

  const burnPrice = 0.00000067312;

  const allowanceAmt = useSelector(
    (state: typeof RootState) => state.amt.allowanceMarketVault
  );

  /*   const quema = marketPlaceOperations.backingWithdrawl */

  const [inputPagarValue, setInputPagarValue] = useState("");
  const [inputRecibirValue, setInputRecibirValue] = useState("");

  const inputPagar = useRef<HTMLInputElement>(null);
  const inputRecibir = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputPagarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputPagarValue(event.target.value);
  };

  const handleInputRecibirChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputRecibirValue(event.target.value);
  };

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>Vocé vende</h2>
          <p>Saldo: {balanceAmt}</p>
        </div>
        <div className="cuadroCompra">
          <img
            onClick={() => {
              true;
            }}
            src={listaMonedas.amt.logoURI}
          />
          <div>{listaMonedas.amt.symbol}</div>
          <input
            ref={inputPagar}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={handleInputPagarChange}
            value={inputPagarValue}
          />
        </div>
      </div>
      <div id="segundaSeccion">
        <div className="saldo">
          <h2>Vocé recebe</h2>
          <p>Saldo: {balanceBtcb}</p>
        </div>
        <div className="cuadroCompra">
          <img src={listaMonedas.btcb.logoURI} alt="" />
          <div>BTC</div>
          <input
            ref={inputRecibir}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={handleInputRecibirChange}
            value={inputRecibirValue}
          />
        </div>
      </div>
      <div className="containerSaldos">
        <div>
          <h2>AMT a venda:</h2>
          <div>{}</div>
        </div>
        <div>
          <h2>Preco do AMT:</h2>
          <div>1 AMT = {""} USDT</div>
        </div>
      </div>
      <div>
        <BotonOperacionQuema balanceAmt={balanceAmt} input={inputPagarValue} />
      </div>
    </>
  );
};

export default CuadroPancake;
