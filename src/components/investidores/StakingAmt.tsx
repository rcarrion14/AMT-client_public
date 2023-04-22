import React from "react";
import CuadroUnimoneda from "../CuadroUnimoneda";

const StakingAmt = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      <h1>Staking de Autocompra de AMT</h1>
      <p>
        No "Staking de Autocompra" do AutoMiningToken, os seus rendimientos em
        bitcoin compram mais AMT todos os dias para vocé, d forma automática e
        ivre de taxas
      </p>
      <p>
        O investidor paga taza de gás apenas ao colocar e retirar seus tokens na
        Autocompra. As taxas cobradas pelas compras diárias e automáticas sao
        pagas pelo AMT.
      </p>
      <p>
        Na prática, a medida que a quantidade de AMT aumenta, seus rendimientos,
        mais AMT sao comprados, e assim por diante, de modo que funciona como um
        juro composto.
      </p>
      <p>
        Vocé pode simular seus recebimientos <u>clicando aqui</u>
      </p>
      <CuadroUnimoneda />
    </div>
  );
};

export default StakingAmt;
