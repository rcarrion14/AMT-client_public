import React, { useState } from "react";
import CuadroQuema from "./CuadroQuema";
import { textoQuema, textosExtra } from "../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { CSSTransition } from "react-transition-group";
import EstadisticasQuema from "./EstadisticasQuema";
interface quemaInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string | null>>;
}
const Quema: React.FC<quemaInterface> = ({ setActivePage }) => {
  const [activarEstadisticas, setActivarEstadisticas] = useState(false);
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <>
      <div className="containerSlide">
        <div className="navBar_top">
          <img onClick={() => setActivePage(null)} src="icon_nav.png" />
          <h1>Marketplace</h1>
        </div>

        <div className="container">
          {textoQuema(currentLanguage)}
          <div className="textoConexion">
            <button
              onClick={() => {
                setActivarEstadisticas(true);
              }}
            >
              {textosExtra[currentLanguage].estadisticas}
            </button>
          </div>
          <CuadroQuema />
        </div>
      </div>
      <CSSTransition
        in={activarEstadisticas == true}
        timeout={800}
        classNames="slideIzquierda"
        unmountOnExit
      >
        <EstadisticasQuema setActivarEstadisticas={setActivarEstadisticas} />
      </CSSTransition>
    </>
  );
};

export default Quema;
