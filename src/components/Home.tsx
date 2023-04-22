import React, { useContext, useEffect } from "react";
import { BotonMetamask } from "./BotonMetamask";
import BotonBlanco from "./marketplace/BotonBlanco";

interface HomeProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  return (
    <>
      <h1> Bem-vindo!</h1>
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
        Para navegar pelo site, conecte a sua Metamask, clickando no botao
        abaixo
        <BotonMetamask />
      </p>

      <BotonBlanco
        titulo={"Market"}
        descripcion={"Compre e venda AMT!"}
        activador={"marketplace"}
        setActivePage={setActivePage}
        image={"icon_marketplace.png"}
      />
      <BotonBlanco
        titulo={"Investimentos"}
        descripcion={"Faca seus AMT reinderem mais!"}
        activador={"investidores"}
        setActivePage={setActivePage}
        image={"icon_invest.png"}
      />
      <BotonBlanco
        titulo={"Grandes investidores"}
        descripcion={"Consulte a distribucao de lucros."}
        activador={"gInvestidores"}
        setActivePage={setActivePage}
        image={"icon_grandesInvest.png"}
      />
    </>
  );
};

export default Home;
