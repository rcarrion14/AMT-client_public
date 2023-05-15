import React from "react";
import {
  agregarAmt,
  agregarBbtc,
  agregarUsdt,
} from "../../Utils/agreagarTokens";

interface AgregarTokensProps {
  agregarTokens: boolean;
  setAgregarTokens: React.Dispatch<React.SetStateAction<boolean>>;
}
const AgregarTokens: React.FC<AgregarTokensProps> = ({
  setAgregarTokens,
  agregarTokens,
}) => {
  return (
    <div className="noDeshabilitar divContainterSelectorTokens">
      <div className="noDeshabilitar containterSelectorTokens">
        <div className="containerClose">
          <div>Para agregar, seleccione moneda</div>
          <img
            onClick={() => {
              setAgregarTokens(false);
            }}
            className="close"
            src="close.png"
            alt=""
          />
        </div>

        <div className="listaAgregar">
          <img
            onClick={() => {
              agregarAmt();
            }}
            src="coinAutomining.png"
            alt=""
          />
          <div
            onClick={() => {
              agregarAmt();
            }}
          >
            AMT
          </div>

          <img
            onClick={() => {
              agregarBbtc();
            }}
            src="coinBitcoin.png"
            alt=""
          />
          <div
            onClick={() => {
              agregarBbtc();
            }}
          >
            BTCB
          </div>

          <img
            onClick={() => {
              agregarUsdt();
            }}
            src="coinT.png"
            alt=""
          />
          <div
            onClick={() => {
              agregarUsdt();
            }}
          >
            USDT
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarTokens;
