import React from "react";
import { snapToDateMapp } from "./snapshotDateMapper";
import Spinner from "../Generales/Spinner/Spinner";

import { textosExtra } from "../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toFrontEndString } from "../../Utils/formatHelpers";
import { BigNumber } from "ethers";
interface cuadroCobroProps {
  balanceOfAt: BigNumber | undefined;
  payAt: BigNumber | undefined;
  totalSupplyAt: BigNumber | undefined;
  currentSnap: number;
  alreadyCharged: boolean | null | undefined;
  charge: () => void;
}
const CuadroCobro: React.FC<cuadroCobroProps> = ({
  balanceOfAt,
  payAt,
  totalSupplyAt,
  currentSnap,
  alreadyCharged,
  charge,
}) => {
  const allValuesDefined =
    payAt !== undefined &&
    balanceOfAt !== undefined &&
    totalSupplyAt !== undefined &&
    alreadyCharged !== undefined &&
    currentSnap !== undefined;

  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );


  return (
    <div className="cuadroCobro">
      <img className="activeIcon" src="arrow-down.png" alt="" />

      <div className="transparente">
        {allValuesDefined ? (
          <>
            <p>
              {snapToDateMapp(currentSnap)} - {currentSnap}
            </p>
            <p className="aCobrar">
              {textosExtra[currentLanguage].btcACobrar}{" "}
              {toFrontEndString(payAt.mul(balanceOfAt).div(totalSupplyAt))}
            </p>
            <p>
              {textosExtra[currentLanguage].distribucion}{" "}
              {toFrontEndString(payAt)}
            </p>
          </>
        ) : (
          <Spinner size={20} gradientColor={["#00bfdc", "#fff"]}></Spinner>
        )}
      </div>

      <button
        onClick={alreadyCharged ? undefined : charge}
        className={alreadyCharged ? "inactive" : undefined}
      >
        {allValuesDefined ? (
          <>
            {alreadyCharged
              ? textosExtra[currentLanguage].yaCobrado
              : balanceOfAt.lte(BigNumber.from("1000000000000000"))
              ? textosExtra[currentLanguage].nadaACobrar
              : textosExtra[currentLanguage].cobrar}
          </>
        ) : (
          <>
            <Spinner size={20} gradientColor={["#00bfdc", "#fff"]}></Spinner>
          </>
        )}
      </button>
    </div>
  );
};

export default CuadroCobro;
