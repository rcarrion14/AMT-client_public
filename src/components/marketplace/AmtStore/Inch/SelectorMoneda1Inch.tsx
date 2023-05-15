import React, { useEffect, useState, useRef } from "react";
import { monedaInterface } from "../../../../Utils/listaMonedas";
const checkedIcon = (
  <img src="check.png" className="activeIcon iconChecked" alt="" />
);

interface SelectorMonedaInterface {
  monedaActive: monedaInterface;
  setmonedaActive: React.Dispatch<React.SetStateAction<monedaInterface>>;
  setSelector: React.Dispatch<React.SetStateAction<boolean>>;
  tokenList: any;
}

const SelectorMoneda1Inch: React.FC<SelectorMonedaInterface> = ({
  setmonedaActive,
  monedaActive,
  setSelector,
  tokenList,
}) => {
  const [buscadorValue, setBuscadorValue] = useState("");

  const inputBusqueda = useRef<HTMLInputElement>(null);

  const htmlListGenerator = () => {
    const keys = Object.keys(tokenList);

    const htmlList = keys.map((addr) => {
      if (tokenList[addr].symbol.indexOf(buscadorValue.toUpperCase()) >= 0) {
        return (
          <div key={addr} className="moneda">
            <div
              className={
                tokenList[addr].symbol == monedaActive.symbol
                  ? "monedaSelected"
                  : undefined
              }
              onClick={() => {
                setmonedaActive(tokenList[addr]);
                setSelector(false);
              }}
            >
              <img
                className="imgDex"
                onClick={() => {
                  setmonedaActive(tokenList[addr]);
                  setSelector(false);
                }}
                src={tokenList[addr].logoURI}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "icon_question.png";
                }}
              />
              {tokenList[addr].symbol}
            </div>
            {tokenList[addr].symbol == monedaActive.symbol ? checkedIcon : null}
          </div>
        );
      }
    });

    return htmlList;
  };

  return (
    <div className="containterSelectorBuscador">
      <div className="containerClose">
        <div>Buscador:</div>
        <input
          className="inputBusqueda"
          type="text"
          ref={inputBusqueda}
          onChange={() => {
            if (inputBusqueda.current) {
              setBuscadorValue(inputBusqueda.current.value);
            }
          }}
        />
        <img
          onClick={() => {
            setSelector(false);
          }}
          className="close"
          src="close.png"
        />
      </div>
      {htmlListGenerator()}
    </div>
  );
};

export default SelectorMoneda1Inch;
