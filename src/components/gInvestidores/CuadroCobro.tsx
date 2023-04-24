import React from "react";
import { format } from "../coinFormater";
import { snapToDateMapp } from "./snapshotDateMapper";
import Spinner from "../Spinner";
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

  return (
    <div className="cuadroCobro">
      <img className="activeIcon" src="arrow-down.png" alt="" />

      <div className="transparente">
        {allValuesDefined ? (
          <>
            {" "}
            <p>
              {snapToDateMapp(currentSnap)} - {currentSnap}
            </p>
            <p className="aCobrar">
              BTC a cobrar: {((payAt * balanceOfAt) / totalSupplyAt).toFixed(5)}
            </p>
            <p>balanceOfAt: {balanceOfAt}</p>
            <p>Distribucion: {payAt?.toFixed(5)}</p>
          </>
        ) : (
          <Spinner size={20} gradientColor={["#00bfdc", "#fff"]}></Spinner>
        )}
      </div>

      <button onClick={charge} disabled={alreadyCharged || balanceOfAt == 0}>
        {allValuesDefined ? (
          <>{alreadyCharged ? "ya cobrado" : "cobrar"}</>
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
