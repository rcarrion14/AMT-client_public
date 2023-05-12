import React from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import {
  textoBotonesBlancos,
  textosExtra,
  textoEstadisticasQuema,
} from "../../../Utils/textos";
import LineChart from "./LineChart";
interface estatdisticasQuemaInterface {
  setActivarEstadisticas: (param: boolean) => void;
}

const EstadisticasQuema: React.FC<estatdisticasQuemaInterface> = ({
  setActivarEstadisticas,
}) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const backRate = useSelector(
    (state: typeof RootState) => state.burnVault.backRate
  );
  return (
    <>
      <div className="containerSlide">
        <div className="navBar_top">
          <img
            onClick={() => setActivarEstadisticas(false)}
            src="icon_nav.png"
          />
          <h1>{textoBotonesBlancos[currentLanguage].quema.titulo}</h1>
        </div>
        <div className="containerEstadisticasQuema">
          {textoEstadisticasQuema(currentLanguage)}
        </div>

        <LineChart />
      </div>
    </>
  );
};

export default EstadisticasQuema;
