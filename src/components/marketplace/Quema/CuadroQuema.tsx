import React, { useRef, useState } from "react";
import BotonOperacionQuema from "./BotonOperacionQuema";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { listaMonedas } from "../../../Utils/listaMonedas";
import { amtOperations } from "../../../store/features/amt/amtOperations";
import { burnVaultOperations } from "../../../store/features/burnVault/burntVaultOperation";
import { textosExtra } from "../../../Utils/textos";
import { toFrontEndString } from "../../../Utils/formatHelpers";

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

  const approveMarket = amtOperations.approveBurnVault;

  const burn = burnVaultOperations.backingWithdrawl;

  //Gestion de los input
  const inputPagar = useRef<HTMLInputElement>(null);
  const inputRecibir = useRef<HTMLInputElement>(null);
  const [inputPagarValue, setInputPagarValue] = useState("");
  const [inputRecibirValue, setInputRecibirValue] = useState("");

  const handleInputPagarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (parseFloat(event.target.value) >= 0) {
      if (backRate) {
        setInputRecibirValue(
          (parseFloat(event.target.value) / backRate).toString()
        );
      }
      setInputPagarValue(event.target.value);
    }
  };

  const handleInputRecibirChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (parseFloat(event.target.value) >= 0) {
      if (backRate) {
        setInputPagarValue(
          (parseFloat(event.target.value) * backRate).toString()
        );
      }
      setInputRecibirValue(event.target.value);
    }
  };

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>{textosExtra[currentLanguage].ustedPaga}</h2>
          <p>
            {textosExtra[currentLanguage].saldo}{" "}
            {balanceAmt ? toFrontEndString(balanceAmt) : "-"}
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
            {textosExtra[currentLanguage].saldo}{" "}
            {balanceBtcb ? toFrontEndString(balanceBtcb) : "-"}
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
          <div>
            1 AMT = {backRate ? Number((1 / backRate).toFixed(6)) : ""} BTC
          </div>
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
