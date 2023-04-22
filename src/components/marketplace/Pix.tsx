import React from "react";

const Pix = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        <h1>Compra e venda com pix</h1>
        <p>
          O nosso time está trabalhando para disponibilizar essa funcionalidade
          de forma automática aqui no site, bem como a compra recorrente com
          carta-o de crédito.
        </p>
        <p>
          Enquanto isso, você pode nos chamar no WhatsApp ou no Telegram para
          comprar ou vender criptos com PIX.
        </p>
        <p>
          O atendimento de nosso time é em horário comercial, de segunda a
          sexta-feira, das 9 hs. ás 18 hs.
        </p>
        <div className="flexBox">
          <button className="verde">WhatsApp</button>
          <button>Telegram</button>
        </div>
      </div>
    </div>
  );
};

export default Pix;
