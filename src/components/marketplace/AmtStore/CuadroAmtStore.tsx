import React, { useRef, useState } from "react";
import BotonOperacionAmtStore from "./BotonOperacionAmtStore";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { marketPlaceOperations } from "../../../store/features/marketplace/marketPlaceOperations";
import { usdtOperations } from "../../../store/features/usdt/usdtOperations";
import { textosExtra } from "../../../Utils/textos";
import { toFrontEndString } from "../../../Utils/formatHelpers";
const CuadroAmtStore = () => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  //Datos del componente
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );
  const balanceUsdt = useSelector(
    (state: typeof RootState) => state.usdt.balance
  );

  const allowanceUsdt = useSelector(
    (state: typeof RootState) => state.usdt.allowanceMarket
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
            {textosExtra[currentLanguage].saldo}
            {balanceUsdt && balanceUsdt.gte(0)
              ? toFrontEndString(balanceUsdt)
              : "-"}
          </p>
        </div>
        <div className="cuadroCompra">
          <img src="coinT.png" />
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
          <h2>{textosExtra[currentLanguage].ustedRecibe}</h2>
          <p>
            {textosExtra[currentLanguage].saldo}{" "}
            {balanceAmt && balanceAmt.gte(0)
              ? toFrontEndString(balanceAmt)
              : "-"}
          </p>
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
          <h2>{textosExtra[currentLanguage].amtEnVenta}</h2>
          <div>
            {balanceTienda && balanceTienda.gte(0)
              ? toFrontEndString(balanceTienda)
              : "-"}
          </div>
        </div>
        <div>
          <h2>{textosExtra[currentLanguage].precioAmt}</h2>
          <div>1 AMT = {precioTienda} USDT</div>
        </div>
      </div>
      <div>
        <BotonOperacionAmtStore
          balanceTienda={balanceTienda}
          allowanceUsdt={allowanceUsdt}
          balanceUsdt={balanceUsdt}
          input={inputPagarValue}
          operacionAprobar={usdtOperations.approveMarket}
          operacionBuy={marketPlaceOperations.buy}
        />
      </div>
    </>
  );
};

export default CuadroAmtStore;
