import React, { ReactElement } from "react";
import BotonBlanco from "../../Generales/BotonBlanco";
import Simulador from "./Simulador";
import SimuladorActual from "./SimuladorActual";
import Maquinas from "./Maquinas";
import Grafico from "./GraficaPrecioAmt/Grafico";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { textoBotonesBlancos, textoRendimientos } from "../../../Utils/textos";

interface RendimientosInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
interface jsxPagesInterface {
  [key: string]: ReactElement<any, any>;
}

const Rendimientos: React.FC<RendimientosInterface> = ({ setActivePage }) => {
  const pages = ["simulador", "simuladorActual", "maquinas", "grafico"];

  const [activePageRendimientos, setActivePageRendimientos] = useState("");

  const jsxPages: jsxPagesInterface = {
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
        key={"transition" + pagina}
        in={activePageRendimientos == pagina}
        timeout={800}
        classNames="slideIzquierda"
        unmountOnExit
      >
        {jsxPages[pagina]}
      </CSSTransition>
    );
  });
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      {textoRendimientos("por")}
      <BotonBlanco
        titulo={textoBotonesBlancos.por.simulador.titulo}
        descripcion={textoBotonesBlancos.por.simulador.descripcion}
        activador={"simulador"}
        setActivePage={setActivePageRendimientos}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.simuladorActual.titulo}
        descripcion={textoBotonesBlancos.por.simuladorActual.descripcion}
        activador={"simuladorActual"}
        setActivePage={setActivePageRendimientos}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.maquinas.titulo}
        descripcion={textoBotonesBlancos.por.maquinas.descripcion}
        activador={"maquinas"}
        setActivePage={setActivePageRendimientos}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.grafico.titulo}
        descripcion={textoBotonesBlancos.por.grafico.descripcion}
        activador={"grafico"}
        setActivePage={setActivePageRendimientos}
      />

      {listaDePaginas}
    </div>
  );
};

export default Rendimientos;
