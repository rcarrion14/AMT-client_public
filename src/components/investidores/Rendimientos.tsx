import React from "react";
import BotonBlanco from "../marketplace/BotonBlanco";
import Simulador from "./rendimientos/Simulador";
import SimuladorActual from "./rendimientos/SimuladorActual";
import Maquinas from "./rendimientos/Maquinas";
import Grafico from "./rendimientos/Grafico";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const Rendimientos = ({ setActivePage }) => {
  const pages = ["simulador", "simuladorActual", "maquinas", "grafico"];
  const [activePageRendimientos, setActivePageRendimientos] = useState(null);
  const jsxPages = {
    simulador: <Simulador setActivePage={setActivePageRendimientos} />,
    simuladorActual: (
      <SimuladorActual setActivePage={setActivePageRendimientos} />
    ),
    maquinas: <Maquinas setActivePage={setActivePageRendimientos} />,
    grafico: <Grafico setActivePage={setActivePageRendimientos} />,
  };

  const listaDePaginas = pages.map((pagina) => {
    return (
      <CSSTransition
        in={activePageRendimientos == pagina}
        timeout={670}
        classNames="market"
        unmountOnExit
      >
        {jsxPages[pagina]}
      </CSSTransition>
    );
  });
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      <h1>Quanto rende o AMT?</h1>
      <p>
        A rentabilidade do AMT depende de alguns fatores, como:
        <ul>Preço pago por token (AMT)</ul>
        <ul>Preço do Bitcoin</ul>
        <ul>Taxa de dificuldade da rede de mineração</ul>
        <ul>Custos da operação, principalmente a energia elétrica</ul>
        <ul>Poder computacional utilizado para minerar</ul>
      </p>
      <p>
        A maioria dessas variáveis estão em constante mudança, e são alheias ao
        Projeto AMT, de modo que não é possível garantir determinada
        rentabilidade.
      </p>
      <p>
        O que é possível fazer é simular a rentabilidade tomando como base os
        parâmetros de momento atual, como se fossem constantes - mas não são
      </p>
      <p>Confira abaixo mais detalhes.</p>
      <BotonBlanco
        titulo={"Simule a rentabilidade"}
        descripcion={"Confira quanto rende o AMT em diferentes cenários"}
        activador={"simulador"}
        setActivePage={setActivePageRendimientos}
      />
      <BotonBlanco
        titulo={"Rentabilidad de staking agora"}
        descripcion={"Confira quanto rende o AMT no cenário atual"}
        activador={"simuladorActual"}
        setActivePage={setActivePageRendimientos}
      />
      <BotonBlanco
        titulo={"Máquinas ativas no Projeto AMT"}
        descripcion={"Confira nossa producao diária de bitcoins"}
        activador={"maquinas"}
        setActivePage={setActivePageRendimientos}
      />
      <BotonBlanco
        titulo={"Gráfico de preco de AMT"}
        descripcion={"confira o valor do AMT contra o BTC e USDT"}
        activador={"grafico"}
        setActivePage={setActivePageRendimientos}
      />

      {listaDePaginas}
    </div>
  );
};

export default Rendimientos;
