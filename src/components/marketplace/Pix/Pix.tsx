// @ts-nocheck

import React from "react";
import { textoPix } from "../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Pix = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoPix(currentLanguage)}
        <div className="flexBox">
          <button className="verde">WhatsApp</button>
          <button>Telegram</button>
        </div>
      </div>
    </div>
  );
};

export default Pix;
