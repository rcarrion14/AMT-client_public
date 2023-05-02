// @ts-nocheck
import React, { useRef, useState } from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

interface SimuladorActualInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const SimuladorActual: React.FC<SimuladorActualInterface> = ({
  setActivePage,
}) => {
  const [autocompra, setAutocompra] = useState(false);
  const inputAmt = useRef<HTMLInputElement>(null);
  const [inputAmtValue, setInputAmtValue] = useState(100000);
  const ultimoPago = useSelector(
    (state: typeof RootState) => state.master.pays1
  );
  const totalSupply = useSelector(
    (state: typeof RootState) => state.amt.totalSupply
  );

  const precioBtcb = 28500;
  const precioAmt = 0.2;

  const diaria = () => {
    if (!autocompra) {
      const cobrado = ((inputAmtValue * ultimoPago) / totalSupply).toFixed(5);
      const cobradoEnUsdt = (cobrado * precioBtcb).toFixed(2);
      return cobrado + " BTCB (" + cobradoEnUsdt + " USDT)";
    } else {
      const cobrado = ((inputAmtValue * ultimoPago) / totalSupply).toFixed(5);
      const cobradoEnAmt = ((cobrado * precioBtcb) / precioAmt).toFixed(2);
      return cobrado + " BTCB (" + cobradoEnAmt + " AMT)";
    }
  };

  const mensual = () => {
    if (!autocompra) {
      const cobrado = (
        ((inputAmtValue * ultimoPago) / totalSupply) *
        30
      ).toFixed(5);
      const cobradoEnUsdt = (cobrado * precioBtcb).toFixed(2);
      return cobrado + " BTCB (" + cobradoEnUsdt + " USDT)";
    } else {
      const cobrado = (
        ((inputAmtValue * ultimoPago) / totalSupply) *
        30
      ).toFixed(5);
      const cobradoEnAmt = ((cobrado * precioBtcb) / precioAmt).toFixed(2);
      return cobrado + " BTCB (" + cobradoEnAmt + " AMT)";
    }
  };

  const anual = () => {
    if (!autocompra) {
      const cobrado = (
        ((inputAmtValue * ultimoPago) / totalSupply) *
        30 *
        12
      ).toFixed(5);
      const cobradoEnUsdt = (cobrado * precioBtcb).toFixed(2);
      return cobrado + " BTCB (" + cobradoEnUsdt + " USDT)";
    } else {
      const cobrado = (
        ((inputAmtValue * ultimoPago) / totalSupply) *
        30 *
        12
      ).toFixed(5);
      const cobradoEnAmt = ((cobrado * precioBtcb) / precioAmt).toFixed(2);
      return cobrado + " BTCB (" + cobradoEnAmt + " AMT)";
    }
  };

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      <h2>Rentabilidade do Staking agora</h2>

      <div className="containerSimuladorStaking">
        <div className="botonesSimuladorStaking">
          <button
            onClick={() => {
              setAutocompra(false);
            }}
            className={autocompra ? null : "active"}
          >
            Staking Padrao (Receba BTCB)
          </button>
          <button
            onClick={() => {
              setAutocompra(true);
            }}
            className={autocompra ? "active" : null}
          >
            Autocompra (Receba AMT)
          </button>
        </div>

        <div className="saldo">
          <h2>Número de tokens em staking: </h2>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining.png" />
          <div>AMT</div>
          <input
            ref={inputAmt}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={() => setInputAmtValue(inputAmt.current?.value)}
            value={inputAmtValue}
          />
        </div>
      </div>

      <div className="containerResultadosSimulacion">
        <h2>No cenário atual, a rentabilidade seria:</h2>
        <div>
          <h2>Rentabilidade diaria</h2>
          <div>{diaria()}</div>
        </div>
        <div>
          <h2>Rentabilidade mensal</h2>
          <div>{mensual()}</div>
        </div>
        <div>
          <h2>Rentabilidade anual</h2>
          <div>{anual()}</div>
        </div>
      </div>
    </div>
  );
};

export default SimuladorActual;
