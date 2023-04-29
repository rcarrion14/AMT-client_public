import React from "react";

const Historico = ({ setHistorico }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setHistorico(false)} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>

      <div className="cuadroGanaciasStaking">
        <div>BTCB</div>
        <div>0.0050</div>
        <div className="celeste">1151,15 USDT</div>
        <div className="celeste">
          <b>AMT depositados: </b> 100000
        </div>
        <div className="celeste">
          <b>Data do depósito: </b> 08/04/2023
        </div>
        <div className="celeste">
          <b>BTCB recebidos: </b> +0.0050 (média de 0.001/dia)
        </div>
      </div>

      <div className="cuadroCobro">
        <img className="activeIcon" src="arrow-down.png" alt="" />
        <div className="transparente"> hola </div>
        <div className="transparente"> + 150AMT</div>
      </div>
    </div>
  );
};

export default Historico;
