// @ts-nocheck

import React from "react";
import CuadroQuema from "./CuadroQuema";
import {
  textoBotonesBlancos,
  textoQuema,
  textosExtra,
} from "../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
const Quema = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoQuema(currentLanguage)}
        <button className="btnLarge">Estadisticas ??¿¿</button>
        <CuadroQuema />
      </div>
    </div>
  );
};

export default Quema;
