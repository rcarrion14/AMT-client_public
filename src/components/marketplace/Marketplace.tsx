// @ts-nocheck
import React, { useState, ReactElement } from "react";
import AmtStore from "./AmtStore/AmtStore";
import { CSSTransition } from "react-transition-group";
import PancakeSwap from "./pancake/PancakeSwap";
import Pix from "./Pix/Pix";
import Quema from "./Quema/Quema";
import BotonBlanco from "../Generales/BotonBlanco";
import {
  textoBotonesBlancos,
  textoMarketplace,
  textosExtra,
} from "../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AgregarTokens from "./AgregarTokens";

interface MarketplaceInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Marketplace: React.FC<MarketplaceInterface> = () => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const pages: string[] = ["store", "pancake", "quema", "pix"];
  const [activePage, setActivePage] = useState("marketplace");
  const [agregarTokens, setAgregarTokens] = useState(false);

  interface jsxPagesInterface {
    [key: string]: ReactElement<any, any>;
  }
  const jsxPages: jsxPagesInterface = {
    store: <AmtStore setActivePage={setActivePage} />,
    pancake: <PancakeSwap setActivePage={setActivePage} />,
    quema: <Quema setActivePage={setActivePage} />,
    pix: <Pix setActivePage={setActivePage} />,
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
      <div
        className={
          agregarTokens
            ? "containerLengueta deshabilitador"
            : "containerLengueta"
        }
      >
        {textoMarketplace(currentLanguage)}
        <div className="textoConexion">
          <button onClick={() => setAgregarTokens(true)}>
            {textosExtra[currentLanguage].importarTokens}
          </button>
        </div>
        <BotonBlanco
          titulo={textoBotonesBlancos[currentLanguage].store.titulo}
          descripcion={textoBotonesBlancos[currentLanguage].store.descripcion}
          activador={"store"}
          setActivePage={setActivePage}
        />
        <BotonBlanco
          titulo={textoBotonesBlancos[currentLanguage].pancake.titulo}
          descripcion={textoBotonesBlancos[currentLanguage].pancake.descripcion}
          activador={"pancake"}
          setActivePage={setActivePage}
        />
        <BotonBlanco
          titulo={textoBotonesBlancos[currentLanguage].quema.titulo}
          descripcion={textoBotonesBlancos[currentLanguage].quema.descripcion}
          activador={"quema"}
          setActivePage={setActivePage}
        />
        <BotonBlanco
          titulo={textoBotonesBlancos[currentLanguage].pix.titulo}
          descripcion={textoBotonesBlancos[currentLanguage].pix.descripcion}
          activador={"pix"}
          setActivePage={setActivePage}
        />
        {listaDePaginas}
        <CSSTransition
          in={agregarTokens}
          timeout={800}
          classNames="animacionAgregar"
          unmountOnExit
        >
          <AgregarTokens setAgregarTokens={setAgregarTokens} />
        </CSSTransition>
      </div>
    </>
  );
};

export default Marketplace;
