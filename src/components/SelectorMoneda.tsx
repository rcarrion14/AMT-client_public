import React from "react";

const SelectorMoneda = ({
  setmonedaActive,
  dataMonedas,
  monedaActive,
  setSelector,
}) => {
  const monedas = Object.keys(dataMonedas);

  const icon = (
    <img src="check.png" className="activeIcon iconChecked" alt="" />
  );

  const list = monedas.map((moneda) => {
    return (
      <div className="moneda">
        <div className={moneda == monedaActive ? "monedaSelected" : null}>
          <img
            onClick={() => {
              setSelector(false);
              setmonedaActive(moneda);
            }}
            src={dataMonedas[moneda]}
          />
          {moneda}
        </div>
        {moneda == monedaActive ? icon : null}
      </div>
    );
  });

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
      {list}
    </div>
  );
};

export default SelectorMoneda;
