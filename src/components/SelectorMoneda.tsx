import React, { useEffect, useState } from "react";

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
  const [dataMonedas, setDataMonedas] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://api.1inch.io/v5.0/56/tokens");
      let data = await response.json();
      setDataMonedas(data);
    }
    fetchData();
  }, []);

  const checkedIcon = (
    <img src="check.png" className="activeIcon iconChecked" alt="" />
  );

  const htmlListGenerator = () => {
    if (dataMonedas) {
      const addrKeys = Object.keys(dataMonedas["tokens"]);
      const htmlList = addrKeys.map((addr) => {
        return (
          <div className="moneda">
            <div
              className={
                dataMonedas["tokens"][addr]["symbol"] == monedaActive.symbol
                  ? "monedaSelected"
                  : null
              }
            >
              <img
                className="imgDex"
                onClick={() => {
                  setmonedaActive(dataMonedas["tokens"][addr]);
                  setSelector(false);
                  console.log(dataMonedas["tokens"][addr]);
                }}
                src={dataMonedas["tokens"][addr]["logoURI"]}
              />
              {dataMonedas["tokens"][addr]["symbol"]}
            </div>
            {dataMonedas["tokens"][addr]["symbol"] == monedaActive.symbol
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
