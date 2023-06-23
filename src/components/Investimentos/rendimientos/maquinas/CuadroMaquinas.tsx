import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { textosExtra } from "../../../../Utils/textos";
interface CuadroMaquinasProps {
  logo: string;
  maquinas: number | null;
  petahash: number | null;
  produccion: string | null;
}
const CuadroMaquinas: React.FC<CuadroMaquinasProps> = ({
  logo,
  maquinas,
  petahash,
  produccion,
}) => {
  const currentLanguage = useSelector((state: typeof RootState) => state.session.language)
  return (
    <div className="containerMaquinas shadowBox">
      <img className="logoMaquinas" src={logo} alt="" />

      <div className="maquinas shadowBox">
        <b>{textosExtra[currentLanguage].maquinas}</b>
        <div>{maquinas}</div>
      </div>
      <div className="petahash shadowBox">
        <b>Petahash</b>
        <div>{petahash}</div>
      </div>
      <div className="produccion shadowBox">
        <b>{textosExtra[currentLanguage].prodUlt24h}</b>
        <div>{produccion}</div>
      </div>
    </div>
  );
};

export default CuadroMaquinas;
