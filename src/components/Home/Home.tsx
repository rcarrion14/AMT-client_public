import React, { useContext, useEffect } from "react";
import { BotonMetamask } from "../Generales/BotonMetamask";
import BotonBlanco from "../Generales/BotonBlanco";
import { textosExtra, textoBotonesBlancos } from "../../Utils/textos";

interface HomeProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  return (
    <>
      <h1> {textosExtra.por.bienvenido}</h1>
      <div className="containerVideo">
        <iframe
          className="video"
          src="https://www.youtube.com/embed/rqUmSyIb4O0?start=121"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <p className="textoConexion">
        {textosExtra.por.textoConexion}
        h
        <BotonMetamask />
      </p>

      <BotonBlanco
        titulo={textoBotonesBlancos.por.market.titulo}
        descripcion={textoBotonesBlancos.por.market.descripcion}
        activador={"marketplace"}
        setActivePage={setActivePage}
        image={"icon_marketplace.png"}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.investimentos.titulo}
        descripcion={textoBotonesBlancos.por.investimentos.descripcion}
        activador={"investidores"}
        setActivePage={setActivePage}
        image={"icon_invest.png"}
      />
      <BotonBlanco
        titulo={textoBotonesBlancos.por.gInvestidores.titulo}
        descripcion={textoBotonesBlancos.por.gInvestidores.descripcion}
        activador={"gInvestidores"}
        setActivePage={setActivePage}
        image={"icon_grandesInvest.png"}
      />
    </>
  );
};

export default Home;
