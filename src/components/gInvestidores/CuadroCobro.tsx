// @ts-nocheck

import React from "react";
import { format } from "../coinFormater";
import { snapToDateMapp } from "./snapshotDateMapper";
import Spinner from "../Generales/Spinner/Spinner";
import { textosExtra } from "../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface cuadroCobroProps {
  balanceOfAt: number | undefined;
  payAt: number | undefined;
  totalSupplyAt: number | undefined;
  currentSnap: number;
  alreadyCharged: boolean | null | undefined;
  charge: Function;
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
              {((payAt * balanceOfAt) / totalSupplyAt).toFixed(5)}
            </p>
            <p>
              {textosExtra[currentLanguage].distribucion} {payAt?.toFixed(5)}
            </p>
          </>
        ) : (
          <Spinner size={20} gradientColor={["#00bfdc", "#fff"]}></Spinner>
        )}
      </div>

      <button
        onClick={charge}
        disabled={false}
        style={{ backgroundColor: alreadyCharged ? "#a9a9a9" : "#00ddff" }}
      >
        {allValuesDefined ? (
          <>
            {alreadyCharged
              ? textosExtra[currentLanguage].yaCobrado
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
