import React from "react";
import CuadroCobro from "./CuadroCobro";

const GInvestidores = () => {
  return (
    <>
      <h1>Grandes investidores</h1>

      <p>
        Esta página é destinada aos investidores que preferem pagar a taxa de
        gás diariamente, mas manter seus tokens em sua Metamask.
      </p>
      <p>
        Por isso, não recomendamos aos pequenos investidores, isto é, para que
        ao corram o risco de prejudicar a sua rentabilidade tendo que pagar
        taxas.
      </p>
      <p>
        Aos investidores que não desejam pagar a taxas diária, mas sim acumular
        rendimentos em Bitcoin todos os dias, de forma automática, nós
        recomendamos que coloque seus tokens em staking.
        <u>Clique aqui e veja suas opções.</u>
      </p>
      <CuadroCobro />
    </>
  );
};

export default GInvestidores;
