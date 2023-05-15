import React, { useState } from "react";
import CuadroPancake from "./CuadroPancake";
import { textoPancake } from "../../../Utils/textos";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
interface PancakeSwapInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string | null>>;
}

const PancakeSwap: React.FC<PancakeSwapInterface> = ({ setActivePage }) => {
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

      {textoPancake(currentLanguage)}
      <CuadroPancake selector={selector} setSelector={setSelector} />
    </div>
  );
};

export default PancakeSwap;
