import React from "react";
import CuadroBimoneda from "../CuadroBimoneda";

const Quema = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        <h1>Venda seus AMT</h1>
        <p>Esse é o Cofre de Garantia do Projeto AMT.</p>
        <p>
          Quando um usuário troca seus AMT por BTCB, os AMT são queimados, isto
          é, retirados de circulação.
        </p>
        <p>Por isso, o preço do AMT não cai, mas se mantém.</p>
        <p>
          E, considerando que esse Cofre recebe mais bitcoins a cada día, isso
          significa que a relação AMT/BTCB só irá melhorar.
        </p>
        <p>
          Em outras palavras, esse Cofre estabelece um piso para o preco da AMT.
        </p>
        <button className="btnLarge">Estatisticas</button>
        <CuadroBimoneda />
      </div>
    </div>
  );
};

export default Quema;
