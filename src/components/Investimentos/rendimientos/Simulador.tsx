// @ts-nocheck
import React, { useRef, useState } from "react";
import { simuleRentabilidad } from "../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { cuentasSimulador } from "../../../Utils/cuentasSimulador";

interface SimuladorInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Simulador: React.FC<SimuladorInterface> = ({ setActivePage }) => {
  const precioBtcb = 28450;
  const precioAmt = 0.2;

  const [escenarioActual, setEscenarioActual] = useState(true);

  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const ultimoPagoUser = useSelector(
    (state: typeof RootState) => state.master.pays1
  );
  const ultimoPagoLiq = useSelector(
    (state: typeof RootState) => state.master.liqPays1
  );

  const ultimoPago = ultimoPagoUser + ultimoPagoLiq;
  console.log(ultimoPago);

  const totalSupply = useSelector(
    (state: typeof RootState) => state.amt.totalSupply
  );

  const inputPrecioAmt = useRef<HTMLInputElement>(null);
  const inputPrecioBtcb = useRef<HTMLInputElement>(null);
  const cantidadAMT = useRef<HTMLInputElement>(null);
  const [inputPrecioAmtValue, setInputPrecioAmtValue] = useState(precioAmt);
  const [inputPrecioBtcbValue, setInputPrecioBtcbValue] = useState(precioBtcb);
  const [cantidadAmtValue, setCantidadAmtValue] = useState(100000);

  const {
    rentPorcent_usdt_diario,
    cobradoTotal_btcb_diario,
    autoCompra_amt_diario,

    rentPorcent_usdt_mensual,
    cobradoTotal_btcb_mensual,
    autoCompra_amt_mensual,

    rentPorcent_usdt_anual,
    cobradoTotal_btcb_anual,
    autoCompra_amt_anual,
  } = cuentasSimulador(
    ultimoPago,
    inputPrecioBtcbValue,
    inputPrecioAmtValue,
    totalSupply,
    cantidadAmtValue
  );

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      {simuleRentabilidad(currentLanguage)}

      <div className="cuadroSimulador">
        <div className="seccionCantidad">
          <div className="saldo">
            <h2>Quantidade de AMT: </h2>
          </div>
          <div className="cuadroCompraSimulador cantidad">
            <img src="coinAutomining.png" />
            <div>AMT</div>
            <input
              ref={cantidadAMT}
              placeholder="0"
              className="cantidadSimulador"
              type="number"
              onChange={() =>
                setCantidadAmtValue(Number(cantidadAMT.current?.value))
              }
              value={cantidadAmtValue}
            />
          </div>
        </div>
        <div className="botonesSimuladorStaking">
          <button
            onClick={() => {
              setEscenarioActual(true);
            }}
            className={escenarioActual ? "active" : null}
          >
            Cenário atual
          </button>
          <button
            onClick={() => {
              setEscenarioActual(false);
            }}
            className={escenarioActual ? null : "active"}
          >
            Simular cenário
          </button>
        </div>
        <div className="seccion">
          <div className="saldo"></div>
          <div
            style={escenarioActual ? null : { backgroundColor: "white" }}
            className="cuadroCompraSimulador"
          >
            <img src="coinAutomining.png" />
            <div>AMT</div>
            <b>Valor pago por AMT en dólar: </b>
            <input
              disabled={escenarioActual ? true : false}
              ref={inputPrecioAmt}
              placeholder="0"
              className="inputCompra"
              type="number"
              onChange={() =>
                setInputPrecioAmtValue(Number(inputPrecioAmt.current?.value))
              }
              value={inputPrecioAmtValue}
            />
          </div>
        </div>
        <div className="seccion">
          <div className="saldo"></div>
          <div
            style={escenarioActual ? null : { backgroundColor: "white" }}
            className="cuadroCompraSimulador"
          >
            <img src="coinBitcoin.png" />
            <div>AMT</div>
            <b>Insira valor do Bitcoin em dólar: </b>
            <input
              disabled={escenarioActual ? true : false}
              ref={inputPrecioBtcb}
              placeholder="0"
              className="inputCompra"
              type="number"
              onChange={() => {
                setInputPrecioBtcbValue(Number(inputPrecioBtcb.current?.value));
              }}
              value={inputPrecioBtcbValue}
            />
          </div>
          <div className="containerBotonesSimulacion">
            <button
              className="btnSimulacion transparente"
              onClick={() => {
                setPrecioBtcbValue(100000);
              }}
            >
              $ 100k
            </button>
            <button
              className="btnSimulacion transparente"
              onClick={() => {
                setInputPrecioBtcbValue(200000);
              }}
            >
              $ 200 k
            </button>
            <button
              className="btnSimulacion transparente"
              onClick={() => {
                setInputPrecioBtcbValue(1000000);
              }}
            >
              $ 1M
            </button>
          </div>
        </div>

        <h2>Nesse cenário, rentabilidade seria:</h2>

        <div className="containerResultadosSimulacion">
          <h2>Rentabilidade diaria:</h2>
          <div>{rentPorcent_usdt_diario} %</div>
          <h2>Staking Padrao:</h2>
          <div>
            {cobradoTotal_btcb_diario} BTCB (
            {Number((cobradoTotal_btcb_diario * precioBtcb).toFixed(1))} USD)
          </div>
          <h2>Autocompra diaria:</h2>
          <div>
            {autoCompra_amt_diario} AMT (
            {Number((autoCompra_amt_diario * precioAmt).toFixed(1))} USD)
          </div>
        </div>

        <div className="containerResultadosSimulacion">
          <h2>Rentabilidade mensal:</h2>
          <div>{rentPorcent_usdt_mensual} %</div>
          <h2>Staking Padrao:</h2>
          <div>
            {cobradoTotal_btcb_mensual} BTCB (
            {Number((cobradoTotal_btcb_mensual * precioBtcb).toFixed(0))} USD){" "}
          </div>
          <h2>Autocompra diaria:</h2>
          <div>
            {autoCompra_amt_mensual} AMT (
            {Number((autoCompra_amt_mensual * precioAmt).toFixed(0))} USD)
          </div>
        </div>

        <div className="containerResultadosSimulacion">
          <h2>Rentabilidade anual:</h2>
          <div>{rentPorcent_usdt_anual}%</div>
          <h2>Staking Padrao:</h2>
          <div>
            {cobradoTotal_btcb_anual} BTCB (
            {Number((cobradoTotal_btcb_anual * precioBtcb).toFixed(0))} USD)
          </div>
          <h2>Autocompra diaria:</h2>
          <div>
            {autoCompra_amt_anual} AMT (
            {Number((autoCompra_amt_anual * precioAmt).toFixed(0))} USD)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulador;
