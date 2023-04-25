import React from "react";

interface SimuladorActualInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const SimuladorActual: React.FC<SimuladorActualInterface> = ({
  setActivePage,
}) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
    </div>
  );
};

export default SimuladorActual;
