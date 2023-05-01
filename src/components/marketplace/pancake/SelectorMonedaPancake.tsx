// @ts-nocheck

import React, { useEffect, useState } from "react";
import { listaMonedas } from "../../../Utils/listaMonedas";

interface SelectorMonedaInterface {
  monedaActive: React.Dispatch<React.SetStateAction<string>>;
  setmonedaActive: React.Dispatch<React.SetStateAction<string>>;
  setSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectorMoneda: React.FC<SelectorMonedaInterface> = ({
  setmonedaActive,
  monedaActive,
  setSelector,
}) => {
  const checkedIcon = (
    <img src="check.png" className="activeIcon iconChecked" alt="" />
  );

  const htmlListGenerator = () => {
    if (listaMonedas) {
      const htmlList = Object.keys(listaMonedas).map((moneda: string) => {
        return (
          <div key={moneda} className="moneda">
            <div
              className={
                listaMonedas[moneda].symbol == monedaActive.symbol
                  ? "monedaSelected"
                  : null
              }
            >
              <img
                className="imgDex"
                onClick={() => {
                  setmonedaActive(listaMonedas[moneda]);
                  setSelector(false);
                }}
                src={listaMonedas[moneda].logoURI}
              />
              {listaMonedas[moneda].symbol}
            </div>
            {listaMonedas[moneda].symbol == monedaActive.symbol
              ? checkedIcon
              : null}
          </div>
        );
      });
      return htmlList;
    }
  };

  return (
    <div className="containterSelector">
      <div className="containerClose">
        <div>Selecione moneda</div>
        <img
          onClick={() => {
            setSelector(false);
          }}
          className="close"
          src="close.png"
          alt=""
        />
      </div>
      {htmlListGenerator()}
    </div>
  );
};

export default SelectorMoneda;
