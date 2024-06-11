import { useState, ReactElement } from "react";
import BotonBlanco from "../Generales/BotonBlanco";

import { CSSTransition } from "react-transition-group";
import Staking from "./staking/Staking";
import StakingAmt from "./stakingAmt/StakingAmt";
import Liquidez from "./liquidez/Liquidez";
import Rendimientos from "./rendimientos/Rendimientos";
import LoanProtocol from "./loanProtocol/LoanProtocol";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  textoBotonesBlancos,
  textoInvestidores,
  textosExtra,
} from "../../Utils/textos";

const Investidores = () => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  interface jsxPagesInterface {
    [key: string]: ReactElement<any, any>;
  }
  const pages = [
    "staking",
    "stakingAmt",
    "liquidez",
    "rendimiento",
    //"loanProtocol",
  ];

  const [activePage, setActivePage] = useState("");
  const [activeInfo, setActiveInfo] = useState(false);

  const saibaMais = (
    <u onClick={() => setActiveInfo(true)}>
      {textosExtra[currentLanguage].sepaMas}
    </u>
  );

  const jsxPages: jsxPagesInterface = {
    staking: <Staking setActivePage={setActivePage} />,
    stakingAmt: <StakingAmt setActivePage={setActivePage} />,
    liquidez: <Liquidez setActivePage={setActivePage} />,
    rendimiento: <Rendimientos setActivePage={setActivePage} />,
    loanProtocol: <LoanProtocol setActivePage={setActivePage} />,
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
      <div className="containerLengueta">
        <h1>{textosExtra[currentLanguage].inversiones}</h1>

        {activeInfo ? textoInvestidores(currentLanguage) : saibaMais}

        <div>
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].staking.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].staking.descripcion
            }
            activador={"staking"}
            setActivePage={setActivePage}
          />
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].stakingAmt.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].stakingAmt.descripcion
            }
            activador={"stakingAmt"}
            setActivePage={setActivePage}
          />
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].liquidez.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].liquidez.descripcion
            }
            activador={"liquidez"}
            setActivePage={setActivePage}
          />
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].rendimientos.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].rendimientos.descripcion
            }
            activador={"rendimiento"}
            setActivePage={setActivePage}
          />
          {/*
          <BotonBlanco
            titulo={textoBotonesBlancos[currentLanguage].loanProtocol.titulo}
            descripcion={
              textoBotonesBlancos[currentLanguage].loanProtocol.descripcion
            }
            activador={"loanProtocol"}
            setActivePage={setActivePage}
          />
      */}
        </div>

        {listaDePaginas}
      </div>
    </>
  );
};

export default Investidores;
