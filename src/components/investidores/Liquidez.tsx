import React from "react";
import CuadroBimoneda from "../CuadroBimoneda";

const Liquidez = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      <h1>Prover liquidez</h1>
      <p>
        Nessa modalidade de investimento, você passa a receber proporcionalmente
        por cada uma das transações que são realizadas no nosso pool de liquidez
        (na PancakeSwap).
      </p>
      <p>
        A vantagem de prover liquidez pelo nosso site é que, além da
        participação nas transações, os seus AMT continuam trabalhando por você
        gerando rendimentos em BTCB.
      </p>
      <p>
        Para contribuir com a liquidez, é preciso adicionar quantias de BTCB e
        AMT que sejam equivalentes em seu valor.
      </p>
      <p>
        Caso você ainda não possua BTCB, você pode trocar parte dos seus AMT por
        BTCB, dividindo em duas partes iguais o valor total de seu investimento.
      </p>
      <p>
        Cobra-se taxa de gás apenas ao depositar e ao retirar os tokens, além da
        taxa da aprovação do Smart Contract.
      </p>
      <p>
        Não é possível prever quantos AMT ou BTCB você poderá receber, pois
        depende das transações realizadas no pool de liquidez e da relação de
        valor entre as duas moedas.
      </p>
      <CuadroBimoneda />
    </div>
  );
};

export default Liquidez;
