import React from "react";

interface MaquinasInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Maquinas: React.FC<MaquinasInterface> = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
    </div>
  );
};

export default Maquinas;
