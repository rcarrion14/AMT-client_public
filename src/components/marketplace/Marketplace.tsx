import React, { useEffect, useRef, useState, ReactElement } from "react";
import AmtStore from "./AmtStore/AmtStore";
import { CSSTransition } from "react-transition-group";
import PancakeSwap from "./pancake/PancakeSwap";
import Pix from "./Pix/Pix";
import Quema from "./Quema/Quema";
import BotonBlanco from "../Generales/BotonBlanco";
import { textoBotonesBlancos, textoMarketplace } from "../../Utils/textos";

interface MarketplaceInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Marketplace: React.FC<MarketplaceInterface> = () => {
  const pages: string[] = ["store", "pancake", "quema", "pix"];
  const [activePage, setActivePage] = useState("marketplace");

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
      {textoMarketplace("por")}
      <div className="textoConexion">
        <button>IMPORTAR TOKENS</button>
      </div>
      <BotonBlanco
        titulo={textoBotonesBlancos.por.store.titulo}
        descripcion={textoBotonesBlancos.por.store.descripcion}
        activador={"store"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.pancake.titulo}
        descripcion={textoBotonesBlancos.por.pancake.descripcion}
        activador={"pancake"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.quema.titulo}
        descripcion={textoBotonesBlancos.por.quema.descripcion}
        activador={"quema"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.pix.titulo}
        descripcion={textoBotonesBlancos.por.pix.descripcion}
        activador={"pix"}
        setActivePage={setActivePage}
      />
      {listaDePaginas}
    </>
  );
};

export default Marketplace;
