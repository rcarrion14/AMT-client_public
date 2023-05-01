// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
//import SelectorMoneda from "../pancake/SelectorMonedaPancake";
import { CSSTransition } from "react-transition-group";
import BotonOperacionAmtStore from "./BotonOperacionAmtStore";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { marketPlaceOperations } from "../../../store/features/marketplace/marketPlaceOperations";
import { usdtOperations } from "../../../store/features/usdt/usdtOperations";

//import opBlock from "../components/context/OperacionesBlockChain"; // P: Por que hice esto?  -  R: Ni idea

const CuadroAmtStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  //Datos del componente
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );
  const balanceUsdt = useSelector(
    (state: typeof RootState) => state.usdt.balance
  );

  const allowanceUsdt = useSelector(
    (state: typeof RootState) => state.usdt.allowanceMarketVault
  );

  const balanceTienda = useSelector(
    (state: typeof RootState) => state.marketPlace.amtEnVenta
  );

  const precioTienda = useSelector(
    (state: typeof RootState) => state.marketPlace.precioVenta
  );

  //Gestion de los input
  const inputPagar = useRef<HTMLInputElement>(null);
  const inputRecibir = useRef<HTMLInputElement>(null);
  const [monedaActive, setmonedaActive] = useState("USDT");
  const [inputPagarValue, setInputPagarValue] = useState("");
  const [inputRecibirValue, setInputRecibirValue] = useState("");
  const handleInputPagarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputPagarValue(event.target.value);
    setInputRecibirValue(event.target.value);
  };

  const handleInputRecibirChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputRecibirValue(event.target.value);
    setInputPagarValue(event.target.value);
  };

  //Esto lo vamos a necesitar???
  const [selector, setSelector] = useState(false);
  interface dataMonedasInterface {
    [key: string]: string;
  }
  const dataMonedas: dataMonedasInterface = {
    USDT: "coinT.png",
  };
  //Esto de arriba

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>Vocé paga</h2>
          <p>Saldo: {balanceUsdt}</p>
        </div>
        <div className="cuadroCompra">
          <img
            onClick={() => {
              setSelector(true);
            }}
            src={dataMonedas[monedaActive]}
          />
          <div>USDT</div>
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
          <p>Saldo: {balanceAmt}</p>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining.png" alt="" />
          <div>AMT</div>
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
          <div>{balanceTienda}</div>
        </div>
        <div>
          <h2>Preco do AMT:</h2>
          <div>1 AMT = {precioTienda} USDT</div>
        </div>
      </div>
      <div>
        <BotonOperacionAmtStore
          balanceTienda={balanceTienda}
          allowanceUsdt={allowanceUsdt}
          balanceUsdt={balanceUsdt}
          input={inputPagarValue}
          operacionAprobar={usdtOperations.approveMarketVault}
          operacionBuy={marketPlaceOperations.buy}
        />
      </div>
      {/*       <CSSTransition
        in={selector}
        timeout={700}
        classNames="animacionSelector"
        unmountOnExit
      >
        <SelectorMoneda
          setmonedaActive={setmonedaActive}
          monedaActive={monedaActive}
          dataMonedas={dataMonedas}
          setSelector={setSelector}
        />
      </CSSTransition> */}
    </>
  );
};

export default CuadroAmtStore;
