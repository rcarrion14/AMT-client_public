import React from "react";
interface BotonBlancoProps {
  titulo: string;
  descripcion: string;
  activador: any;
  setActivePage: any;
  image?: any;
}
const BotonBlanco: React.FC<BotonBlancoProps> = ({
  titulo,
  descripcion,
  activador,
  setActivePage,
  image,
}) => {
  return (
    <div
      className="botonBlanco shadowBox"
      onClick={() => {
        setActivePage(activador);
      }}
    >
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      {image == undefined ? null : <img src={image} alt="" />}
    </div>
  );
};

export default BotonBlanco;
