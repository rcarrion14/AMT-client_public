import React, { useEffect, useRef, useState, ReactElement } from "react";
import BotonBlanco from "../Generales/BotonBlanco";

import { CSSTransition } from "react-transition-group";
import Staking from "./staking/Staking";
import StakingAmt from "./stakingAmt/StakingAmt";
import Liquidez from "./liquidez/Liquidez";
import Rendimientos from "./rendimientos/Rendimientos";
import {
  textoBotonesBlancos,
  textoInvestidores,
  textosExtra,
} from "../../Utils/textos";

const Investidores = () => {
  interface jsxPagesInterface {
    [key: string]: ReactElement<any, any>;
  }
  const pages = ["staking", "stakingAmt", "liquidez", "rendimiento"];

  const [activePage, setActivePage] = useState("");
  const [activeInfo, setActiveInfo] = useState(false);

  const saibaMais = (
    <u onClick={() => setActiveInfo(true)}>{textosExtra.por.sepaMas}</u>
  );
  const info = textoInvestidores("por");

  const jsxPages: jsxPagesInterface = {
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
        titulo={textoBotonesBlancos.por.staking.titulo}
        descripcion={textoBotonesBlancos.por.staking.descripcion}
        activador={"staking"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.stakingAmt.titulo}
        descripcion={textoBotonesBlancos.por.stakingAmt.descripcion}
        activador={"stakingAmt"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.liquidez.titulo}
        descripcion={textoBotonesBlancos.por.liquidez.descripcion}
        activador={"liquidez"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.rendimientos.titulo}
        descripcion={textoBotonesBlancos.por.rendimientos.descripcion}
        activador={"rendimiento"}
        setActivePage={setActivePage}
      />

      {listaDePaginas}
    </>
  );
};

export default Investidores;
