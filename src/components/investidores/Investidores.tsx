<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import BotonBlanco from "../marketplace/BotonBlanco";

import { CSSTransition } from "react-transition-group";
import Staking from "./Staking";
=======
import React, { useEffect, useRef, useState, ReactElement } from "react";
import BotonBlanco from "../marketplace/BotonBlanco";

import { CSSTransition } from "react-transition-group";
import Staking from "./staking/Staking";
>>>>>>> main
import StakingAmt from "./StakingAmt";
import Liquidez from "./Liquidez";
import Rendimientos from "./Rendimientos";

const Investidores = () => {
<<<<<<< HEAD
  const pages = ["staking", "stakingAmt", "liquidez", "rendimiento"];

  const [activePage, setActivePage] = useState(null);
  const [activeInfo, setActiveInfo] = useState(null);
=======
  interface jsxPagesInterface {
    [key: string]: ReactElement<any, any>;
  }
  const pages = ["staking", "stakingAmt", "liquidez", "rendimiento"];

  const [activePage, setActivePage] = useState("");
  const [activeInfo, setActiveInfo] = useState(false);
>>>>>>> main

  const saibaMais = <u onClick={() => setActiveInfo(true)}>Saiba maís</u>;
  const info = (
    <div>
      <p>
        O Projeto AMT nao custodia o dinheiro dos investidores, dde modo que e
        possivel receber seus rendimientos em bitcoin mesmo mantendo seus AMT em
        sua MetaMask
      </p>
      <p>
        No entanto, para enviar seus rendimientos em BTCB para a sua MetaMask
        voce precisará pagar taza de gás e fazer isso diariamente, o que afetará
        a sua rentabilidade.
      </p>
      <p>
        Por isso, criamos a possibilidade de voce colocar o seus tokens em
        "staking", isto é, depositalá-los em um contrato inteligente seguro para
        acumular seus rendimientos de forma automatica e sem precisasr pagar
        tazas diárias.
      </p>
      <p>
        É preciso pagar taza apenas ao depositar e ao retirar os tokens do
        staking, mesmo que os manthnha lá por anos.
      </p>
      <p>
        Os seus rendimientos sao enviados para este "cofre" de staking e voce
        vai recebendo passivamente, enquanto quiser. Só a carteira que depositou
        os tokens é que poderá retirá-los de lá, mais ninguém terá acesso.
      </p>
      <p>Conheca abaixo as modalidades de que dispomos</p>
    </div>
  );

<<<<<<< HEAD
  const jsxPages = {
=======
  const jsxPages: jsxPagesInterface = {
>>>>>>> main
    staking: <Staking setActivePage={setActivePage} />,
    stakingAmt: <StakingAmt setActivePage={setActivePage} />,
    liquidez: <Liquidez setActivePage={setActivePage} />,
    rendimiento: <Rendimientos setActivePage={setActivePage} />,
  };

  const listaDePaginas = pages.map((pagina) => {
    return (
      <CSSTransition
        key={"transition" + pagina}
        in={activePage == pagina}
        timeout={800}
        classNames="slideIzquierda"
        unmountOnExit
      >
        {jsxPages[pagina]}
      </CSSTransition>
    );
  });

  return (
    <>
      <h1>Investimentos</h1>

      {activeInfo ? info : saibaMais}

      <BotonBlanco
        titulo={"Staking Padrão"}
        descripcion={"Receba mais BTCB diariamente."}
        activador={"staking"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={"Staking de Autocompra de AMT"}
        descripcion={"Receba mais AMT diariamente."}
        activador={"stakingAmt"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={"Prover Liquidez"}
        descripcion={"Receba pelas transacoes no pool de liquidez."}
        activador={"liquidez"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={"Quanto rende o AMT?"}
        descripcion={"Entenda e simule a rentabilidade do AMT."}
        activador={"rendimiento"}
        setActivePage={setActivePage}
      />

      {listaDePaginas}
    </>
  );
};

export default Investidores;
