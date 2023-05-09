// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
//import SelectorMoneda from "../pancake/SelectorMonedaPancake";
import { CSSTransition } from "react-transition-group";
import BotonOperacionQuema from "./BotonOperacionQuema";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../../store/store";
import { marketPlaceOperations } from "../../../store/features/marketplace/marketPlaceOperations";
import { usdtOperations } from "../../../store/features/usdt/usdtOperations";
import { listaMonedas } from "../../../Utils/listaMonedas";
import { amtOperations } from "../../../store/features/amt/amtOperations";
import { burnVaultOperations } from "../../../store/features/burnVault/burntVaultOperation";
import { textosExtra } from "../../../Utils/textos";
import EstadisticasQuema from "./EstadisticasQuema";

const CuadroQuema = () => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  //Datos del componente
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );
  const balanceBtcb = useSelector(
    (state: typeof RootState) => state.btcb.balance
  );

  const allowanceAmt = useSelector(
    (state: typeof RootState) => state.amt.allowanceBurnVault
  );

  const backRate = useSelector(
    (state: typeof RootState) => state.burnVault.backRate
  );

  const approveMarket = amtOperations.approveMarketVault;

  const burn = burnVaultOperations.backingWithdrawl;

  //Gestion de los input
  const inputPagar = useRef<HTMLInputElement>(null);
  const inputRecibir = useRef<HTMLInputElement>(null);
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

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>{textosExtra[currentLanguage].ustedPaga}</h2>
          <p>
            {textosExtra[currentLanguage].saldo} {balanceAmt}
          </p>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining.png" />
          <div>AMT</div>
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
          <h2>{textosExtra[currentLanguage].ustedRecibe}</h2>
          <p>
            {textosExtra[currentLanguage].saldo} {balanceBtcb}
          </p>
        </div>
        <div className="cuadroCompra">
          <img src={listaMonedas.btcb.logoURI} alt="" />
          <div>BTCB</div>
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
      <div className="soloSaldo">
        <div>
          <h2>{textosExtra[currentLanguage].precioAmt}</h2>
          <div>1 AMT = {Number((1 / backRate).toFixed(6))} BTC</div>
        </div>
      </div>
      <div>
        <BotonOperacionQuema
          balanceAmt={balanceAmt}
          balanceBtcb={balanceBtcb}
          allowanceAmt={allowanceAmt}
          backRate={backRate}
          approveMarket={approveMarket}
          burn={burn}
          input={inputPagarValue}
        />
      </div>
    </>
  );
};

export default CuadroQuema;
