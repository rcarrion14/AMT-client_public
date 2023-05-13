import React, { useRef, useState } from "react";
import {
  simuleRentabilidad,
  textoBotonesBlancos,
  textosExtra,
} from "../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { cuentasSimulador } from "../../../Utils/cuentasSimulador";
import { ethers } from "ethers";

interface SimuladorInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Simulador: React.FC<SimuladorInterface> = ({ setActivePage }) => {
  const precioBtcb = useSelector(
    (state: typeof RootState) => state.btcb.precioEnUsdt
  );

  const precioAmt = useSelector(
    (state: typeof RootState) => state.amt.precioEnUsdt
  );

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

  const ultimoPago =
    ultimoPagoLiq && ultimoPagoUser
      ? ultimoPagoUser.add(ultimoPagoLiq)
      : undefined;

  const totalSupply = useSelector(
    (state: typeof RootState) => state.amt.totalSupply
  );

  const inputPrecioAmt = useRef<HTMLInputElement>(null);
  const inputPrecioBtcb = useRef<HTMLInputElement>(null);
  const cantidadAMT = useRef<HTMLInputElement>(null);
  const [inputPrecioAmtValue, setInputPrecioAmtValue] = useState(precioAmt);
  const [inputPrecioBtcbValue, setInputPrecioBtcbValue] = useState(precioBtcb);
  const [cantidadAmtValue, setCantidadAmtValue] = useState(100000);

  const allValuesDefined =
    ultimoPago && totalSupply && inputPrecioBtcbValue && inputPrecioAmtValue;

  let rentPorcent_usdt_diario,
    cobradoTotal_btcb_diario,
    autoCompra_amt_diario,
    rentPorcent_usdt_mensual,
    cobradoTotal_btcb_mensual,
    autoCompra_amt_mensual,
    rentPorcent_usdt_anual,
    cobradoTotal_btcb_anual,
    autoCompra_amt_anual;

  if (allValuesDefined) {
    ({
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
      parseFloat(ethers.utils.formatEther(ultimoPago)),
      inputPrecioBtcbValue,
      inputPrecioAmtValue,
      parseFloat(ethers.utils.formatEther(totalSupply)),
      cantidadAmtValue
    ));
  }

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>{textosExtra[currentLanguage].inversiones}</h1>
      </div>
      {simuleRentabilidad(currentLanguage)}

      <div className="cuadroSimula  dor">
        <div className="seccionCantidad">
          <div className="saldo">
            <h2>{textosExtra[currentLanguage].cantidadAMT}</h2>
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
              setInputPrecioBtcbValue(precioBtcb);
              setInputPrecioAmtValue(precioAmt);
            }}
            className={escenarioActual ? "active" : undefined}
          >
            {textosExtra[currentLanguage].escenarioActual}
          </button>
          <button
            onClick={() => {
              setEscenarioActual(false);
            }}
            className={escenarioActual ? undefined : "active"}
          >
            {textosExtra[currentLanguage].simularEscenario}
          </button>
        </div>
        <div className="seccion">
          <div
            style={escenarioActual ? undefined : { backgroundColor: "white" }}
            className="cuadroCompraSimulador"
          >
            <img src="coinAutomining.png" />
            <div>AMT</div>
            <b>{textosExtra[currentLanguage].valorPagoAmtDolar}</b>
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
            style={escenarioActual ? undefined : { backgroundColor: "white" }}
            className="cuadroCompraSimulador"
          >
            <img src="coinBitcoin.png" />
            <div>BTCB</div>
            <b>{textosExtra[currentLanguage].valorBtcEnDolar} </b>
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
          {escenarioActual ? null : (
            <div className="containerBotonesSimulacion">
              <button
                className="btnSimulacion transparente"
                onClick={() => {
                  setInputPrecioBtcbValue(100000);
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
          )}
        </div>
        <h2>{textosExtra[currentLanguage].enEseEscenarioRentabilidadSeria}</h2>
        {/* DIARIO */}
        <div className="containerResultadosSimulacion">
          <h2>{textosExtra[currentLanguage].rentaDiaria}</h2>
          <div>{rentPorcent_usdt_diario} %</div>
          <h2>{textoBotonesBlancos[currentLanguage].staking.titulo}</h2>
          <div>
            {cobradoTotal_btcb_diario} BTCB (
            {cobradoTotal_btcb_diario && precioBtcb
              ? Number((cobradoTotal_btcb_diario * precioBtcb).toFixed(1))
              : ""}{" "}
            USD)
          </div>
          <h2>{textosExtra[currentLanguage].autocompraDiaria}</h2>
          <div>
            {autoCompra_amt_diario} AMT (
            {autoCompra_amt_diario && precioAmt
              ? Number((autoCompra_amt_diario * precioAmt).toFixed(1))
              : ""}{" "}
            USD)
          </div>
        </div>
        {/* MENSUAL */}
        <div className="containerResultadosSimulacion">
          <h2>{textosExtra[currentLanguage].rentaMensual}</h2>
          <div>{rentPorcent_usdt_mensual} %</div>
          <h2>{textoBotonesBlancos[currentLanguage].staking.titulo}</h2>
          <div>
            {cobradoTotal_btcb_mensual} BTCB (
            {cobradoTotal_btcb_mensual && precioBtcb
              ? Number((cobradoTotal_btcb_mensual * precioBtcb).toFixed(0))
              : ""}{" "}
            USD){" "}
          </div>
          <h2>{textosExtra[currentLanguage].autocompraDiaria}</h2>
          <div>
            {autoCompra_amt_mensual} AMT (
            {autoCompra_amt_mensual && precioAmt
              ? Number((autoCompra_amt_mensual * precioAmt).toFixed(0))
              : ""}{" "}
            USD)
          </div>
        </div>
        {/* ANUAL */}
        <div className="containerResultadosSimulacion">
          <h2>{textosExtra[currentLanguage].rentaAnual}</h2>
          <div>{rentPorcent_usdt_anual}%</div>
          <h2>{textoBotonesBlancos[currentLanguage].staking.titulo}</h2>
          <div>
            {cobradoTotal_btcb_anual} BTCB (
            {cobradoTotal_btcb_anual && precioBtcb
              ? Number((cobradoTotal_btcb_anual * precioBtcb).toFixed(0))
              : ""}{" "}
            USD)
          </div>
          <h2>{textosExtra[currentLanguage].autocompraDiaria}</h2>
          <div>
            {autoCompra_amt_anual} AMT (
            {autoCompra_amt_anual && precioAmt
              ? Number((autoCompra_amt_anual * precioAmt).toFixed(0))
              : ""}{" "}
            USD)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulador;
