// @ts-nocheck
import React, { useRef, useState } from "react";
import { simuleRentabilidad } from "../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface SimuladorInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Simulador: React.FC<SimuladorInterface> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const ultimoPago = useSelector(
    (state: typeof RootState) => state.master.pays1
  );

  const totalSupply = useSelector(
    (state: typeof RootState) => state.amt.totalSupply
  );

  const inputAmt = useRef<HTMLInputElement>(null);
  const inputBtcb = useRef<HTMLInputElement>(null);
  const [inputAmtValue, setInputAmtValue] = useState(0.2);
  const [inputBctbValue, setInputBctbValue] = useState(28300);

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      {simuleRentabilidad(currentLanguage)}

      <div className="cuadroSimulador">
        <div className="seccion">
          <div className="saldo">
            <h2>Valor pago por AMT en dólar: </h2>
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
        <div className="seccion">
          <div className="saldo">
            <h2>Insira valor do Bitcoin em dólar: </h2>
          </div>
          <div className="cuadroCompra">
            <img src="coinBitcoin.png" />
            <div>AMT</div>
            <input
              ref={inputBtcb}
              placeholder="0"
              className="inputCompra"
              type="number"
              onChange={() => {
                setInputBctbValue(inputBtcb.current?.value);
              }}
              value={inputBctbValue}
            />
          </div>
          <div className="containerBotonesSimulacion">
            <button
              className="btnSimulacion transparente"
              onClick={() => {
                setInputBctbValue(100000);
              }}
            >
              $ 100k
            </button>
            <button
              className="btnSimulacion transparente"
              onClick={() => {
                setInputBctbValue(200000);
              }}
            >
              $ 200 k
            </button>
            <button
              className="btnSimulacion transparente"
              onClick={() => {
                setInputBctbValue(1000000);
              }}
            >
              $ 1M
            </button>
          </div>
        </div>

        <div className="containerResultadosSimulacion">
          <h2>Nesse cenário, rentabilidade seria:</h2>
          <div>
            <h2>Rentabilidade diaria</h2>
            <div>
              {ultimoPago
                ? (
                    ((ultimoPago * inputBctbValue) /
                      (inputAmtValue * totalSupply)) *
                    100
                  ).toFixed(4) + " %"
                : null}
            </div>
          </div>
          <div>
            <h2>Rentabilidade mensal</h2>
            <div>
              {ultimoPago
                ? (
                    ((ultimoPago * inputBctbValue) /
                      (inputAmtValue * totalSupply)) *
                    100 *
                    30
                  ).toFixed(4) + " %"
                : null}
            </div>
          </div>
          <div>
            <h2>Rentabilidade anual</h2>
            <div>
              {ultimoPago
                ? (
                    ((ultimoPago * inputBctbValue) /
                      (inputAmtValue * totalSupply)) *
                    100 *
                    30 *
                    12
                  ).toFixed(4) + " %"
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulador;
