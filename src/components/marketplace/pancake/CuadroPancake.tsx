import React, { useEffect, useRef, useState } from "react";
import SelectorMoneda from "../../SelectorMoneda";
import { CSSTransition } from "react-transition-group";
import BotonOperacion from "../../BotonOperacion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { marketPlaceOperations } from "../../../store/features/marketplace/marketPlaceOperations";
import { usdtOperations } from "../../../store/features/usdt/usdtOperations";
import { ethers } from "ethers";

//import opBlock from "../components/context/OperacionesBlockChain"; // P: Por que hice esto?  -  R: Ni idea

const CuadroPancake = () => {
  const inputPagar = useRef<HTMLInputElement>(null);
  const inputRecibir = useRef<HTMLInputElement>(null);
  const [monedaActive, setmonedaActive] = useState({
    symbol: "USDT",
    name: "Tether USD",
    decimals: 18,
    address: "0x55d398326f99059ff775485246999027b3197955",
    logoURI:
      "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
  });
  const [inputPagarValue, setInputPagarValue] = useState("");
  const [inputRecibirValue, setInputRecibirValue] = useState("");

  useEffect(() => {
    if (inputPagarValue) {
      async function fetchData() {
        let endpoint = "https://api.1inch.io/v5.0/56/quote?";
        let from =
          "fromTokenAddress=" + "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
        let to =
          "&toTokenAddress=" + "0x111111111117dc0aa78b770fa6a738034120c302";
        let amount =
          "&amount=" + ethers.utils.parseEther(inputPagarValue.toString());

        let response = await fetch(endpoint + from + to + amount);
        let data = await response.json();
        console.log(data);
      }
      fetchData();
    }
  }, [inputPagarValue]);

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
            src={monedaActive.logoURI}
          />
          <div>{monedaActive.symbol}</div>
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
        <BotonOperacion
          balanceTienda={balanceTienda}
          allowanceUsdt={allowanceUsdt}
          balanceUsdt={balanceUsdt}
          input={inputPagarValue}
          operacionAprobar={usdtOperations.approveMarketVault}
          operacionBuy={marketPlaceOperations.buy}
        />
      </div>
      <CSSTransition
        in={selector}
        timeout={700}
        classNames="animacionSelector"
        unmountOnExit
      >
        <SelectorMoneda
          setmonedaActive={setmonedaActive}
          monedaActive={monedaActive}
          setSelector={setSelector}
        />
      </CSSTransition>
    </>
  );
};

export default CuadroPancake;
