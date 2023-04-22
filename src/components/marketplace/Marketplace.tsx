import React, { useEffect, useRef, useState, ReactElement } from "react";
import AmtStore from "./AmtStore";
import { CSSTransition } from "react-transition-group";
import PancakeSwap from "./PancakeSwap";
import Pix from "./Pix";
import Quema from "./Quema";
import BotonBlanco from "./BotonBlanco";

const Marketplace = () => {
  const pages: string[] = ["store", "pancake", "quema", "pix"];
  const [activePage, setActivePage] = useState("marketplace");

  interface jsxPagesInterface {
    [key: string]: ReactElement<any, any>;
  }
  const jsxPages: jsxPagesInterface = {
    store: <AmtStore setActivePage={setActivePage} />,
    pancake: <PancakeSwap setActivePage={setActivePage} />,
    quema: <Quema setActivePage={setActivePage} />,
    pix: <Pix setActivePage={setActivePage} />,
  };

  const listaDePaginas = pages.map((pagina) => {
    return (
      <CSSTransition
        key={"transition" + pagina}
        in={activePage == pagina}
        timeout={800}
        classNames="slideIzquierda"
        unmountOnExit
      >
        {jsxPages[pagina]}
      </CSSTransition>
    );
  });

  return (
    <>
      <h1>Marketplace</h1>
      <p>
        Para comprar AMT basta ter saldo na sua MetaMask, que pode estar em
        qualquer moeda da Rede de BSC.
      </p>
      <p>A taxa de gás da rede, porém, é sempre cobrada em BNB.</p>
      <p>
        Para visualizar qualquer token em sua MetaMask é preciso importá-lo
        primeiro, mas nós facilitamos isso para você!
      </p>
      <p>
        Clique no botão abaixo e importe os principais tokens da Rede BSC
        (Binance Smart Chain) que são utilizados com frequência pela comunidade
        AMT. É grátis, útil e seguro!
      </p>
      <div className="textoConexion">
        <button>IMPORTAR TOKENS</button>
      </div>
      <BotonBlanco
        titulo={"AMT Store"}
        descripcion={"Compre AMT diretamente do nosso site."}
        activador={"store"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={"PancakeSwap"}
        descripcion={"Utilize nosso site para comprar via PancakeSwap."}
        activador={"pancake"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={"Venda AMT"}
        descripcion={"Troque AMT por BTCB no Cofre de Garantía."}
        activador={"quema"}
        setActivePage={setActivePage}
      />
      <BotonBlanco
        titulo={"Compre e venda cripto con PIX"}
        descripcion={"Disponível apenas para usuários no Brasil."}
        activador={"pix"}
        setActivePage={setActivePage}
      />
      {listaDePaginas}
    </>
  );
};

export default Marketplace;
