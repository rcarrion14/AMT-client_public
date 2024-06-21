import React, { useState } from "react";
import CuadroPancake from "./CuadroPancake";
import { textoPancakeSin1inch } from "../../../Utils/textos";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
interface PancakeSwapInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string | null>>;
}

const PancakeSin1inch: React.FC<PancakeSwapInterface> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const [selector, setSelector] = useState(false);
  return (
    <div
      className={selector ? "containerSlide deshabilitador" : "containerSlide"}
    >
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Marketplace</h1>
      </div>
      {textoPancakeSin1inch(currentLanguage)}
      {
        <div className="singleButtonContainer">
          <iframe
            src="https://pancakeswap.finance/swap?outputCurrency=0x6Ae0A238a6f51Df8eEe084B1756A54dD8a8E85d3&inputCurrency=0x55d398326f99059fF775485246999027B3197955"
            width="420"
            height="630"
          ></iframe>
        </div>
      }

      {/*       <div className="singleButtonContainer">
        <iframe
          src="https://poocoin.app/embed-swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x6Ae0A238a6f51Df8eEe084B1756A54dD8a8E85d3"
          width="420"
          height="630"
        ></iframe>
      </div> */}
    </div>
  );
};

export default PancakeSin1inch;
