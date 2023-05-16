import React from "react";
import { textoPix } from "../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { textosExtra } from "../../../Utils/textos";
interface PixProps {
  setActivePage: React.Dispatch<React.SetStateAction<string | null>>;
}
const Pix: React.FC<PixProps> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const whatsAppMessage = textosExtra[currentLanguage].whatsAppMessage;
  const WhatsAppLink =
    "https://api.whatsapp.com/send?phone=5548996652667&text=+" +
    whatsAppMessage +
    "%21+%3A%29";
  const TelegramLink = "https://t.me/AutoMiningToken";
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage(null)} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      <div className="container">
        {textoPix(currentLanguage)}
        <div className="flexBox">
          <button
            className="verde"
            onClick={() => window.open(WhatsAppLink, "_blank")}
          >
            WhatsApp
          </button>
          <button onClick={() => window.open(TelegramLink, "_blank")}>
            Telegram
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pix;
