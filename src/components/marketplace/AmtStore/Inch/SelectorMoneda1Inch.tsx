import React, { useEffect, useState, useRef } from "react";

const checkedIcon = (
  <img src="check.png" className="activeIcon iconChecked" alt="" />
);

interface SelectorMonedaInterface {
  monedaActive: React.Dispatch<React.SetStateAction<string>>;
  setmonedaActive: React.Dispatch<React.SetStateAction<string>>;
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

  const inputBusqueda = useRef();

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
                  : null
              }
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
    <>
      <div className="containterSelector">
        <div className="containerClose">
          <div>Buscador:</div>
          <input
            className="inputBusqueda"
            type="text"
            ref={inputBusqueda}
            onChange={() => {
              setBuscadorValue(inputBusqueda.current.value);
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
    </>
  );
};

export default SelectorMoneda1Inch;
