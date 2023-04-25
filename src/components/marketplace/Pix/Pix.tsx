import React from "react";
import { textoPix } from "../../../Utils/textos";

const Pix = ({ setActivePage }) => {
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoPix("por")}
        <div className="flexBox">
          <button className="verde">WhatsApp</button>
          <button>Telegram</button>
        </div>
      </div>
    </div>
  );
};

export default Pix;
