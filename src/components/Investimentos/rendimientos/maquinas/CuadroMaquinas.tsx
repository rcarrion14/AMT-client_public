import React from "react";
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
  return (
    <div className="containerMaquinas shadowBox">
      <img className="logoMaquinas" src={logo} alt="" />

      <div className="maquinas shadowBox">
        <b>Maquinas</b>
        <div>{maquinas}</div>
      </div>
      <div className="petahash shadowBox">
        <b>Petahash</b>
        <div>{petahash}</div>
      </div>
      <div className="produccion shadowBox">
        <b>Producao nas últimas 24hs</b>
        <div>{produccion}</div>
      </div>
    </div>
  );
};

export default CuadroMaquinas;
