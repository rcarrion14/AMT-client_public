import React from "react";
import CuadroInterfaz1Inch from "./CuadroInterfaz1Inch";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { textosExtra } from "../../../../Utils/textos";
interface Interfaz1InchInterface {
  setInterfaz: (value: boolean) => void;
}
const Interfaz1Inch: React.FC<Interfaz1InchInterface> = ({ setInterfaz }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <div className="cointainer1Inch noDeshabilitar">
      <div className="close1Inch">
        <h2>{textosExtra[currentLanguage].seleccioneMoneda}</h2>
        <img
          className="close"
          onClick={() => setInterfaz(false)}
          src="close.png"
        />
      </div>
      <div className="container">
        <CuadroInterfaz1Inch />
      </div>
      {/* <img src="1inch_logo.png" alt="" /> */}
    </div>
  );
};

export default Interfaz1Inch;
