import React, { ReactElement } from "react";
import BotonBlanco from "../../Generales/BotonBlanco";
import Simulador from "./Simulador";
import Maquinas from "./maquinas/Maquinas";
import Grafico from "./GraficaPrecioAmt/Grafico";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  textoBotonesBlancos,
  textoRendimientos,
  textosExtra,
} from "../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface RendimientosInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
interface jsxPagesInterface {
  [key: string]: ReactElement<any, any>;
}

const Rendimientos: React.FC<RendimientosInterface> = ({ setActivePage }) => {
  const pages = ["simulador", "maquinas", "grafico"];

  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const [activePageRendimientos, setActivePageRendimientos] = useState<
    string | boolean
  >("");

  const jsxPages: jsxPagesInterface = {
    simulador: <Simulador setActivePage={setActivePageRendimientos} />,

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
    <>
      <div className="containerSlide">
        <div className="navBar_top">
          <img onClick={() => setActivePage("")} src="icon_nav.png" />
          <h1>{textosExtra[currentLanguage].inversiones}</h1>
        </div>
        {textoRendimientos(currentLanguage)}
        <BotonBlanco
          titulo={textoBotonesBlancos[currentLanguage].simulador.titulo}
          descripcion={
            textoBotonesBlancos[currentLanguage].simulador.descripcion
          }
          activador={"simulador"}
          setActivePage={setActivePageRendimientos}
        />
        <BotonBlanco
          titulo={textoBotonesBlancos[currentLanguage].maquinas.titulo}
          descripcion={
            textoBotonesBlancos[currentLanguage].maquinas.descripcion
          }
          activador={"maquinas"}
          setActivePage={setActivePageRendimientos}
        />
        <BotonBlanco
          titulo={textoBotonesBlancos[currentLanguage].grafico.titulo}
          descripcion={textoBotonesBlancos[currentLanguage].grafico.descripcion}
          activador={"grafico"}
          setActivePage={setActivePageRendimientos}
        />
      </div>
      {listaDePaginas}
    </>
  );
};

export default Rendimientos;
