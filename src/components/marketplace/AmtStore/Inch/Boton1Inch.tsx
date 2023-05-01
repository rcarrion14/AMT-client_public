// @ts-nocheck

import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { textosExtra } from "../../../../Utils/textos";
import { ethers } from "ethers";
import { operationExecution } from "../../../../store/features/operationExecution";
interface Boton1InchProps {
  balanceUsdt: number | undefined;
  balanceErc20: number | undefined;
  allowanceErc20: number | undefined;
  txData: string;
  input: string;
  signer: any;
  approveErc20: any;
}
const Boton1Inch: React.FC<BotonOperacionProps> = ({
  balanceUsdt,
  balanceErc20,
  allowanceErc20,
  txData,
  input,
  signer,
  approveErc20,
  addr,
}) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const mensajeBoton = () => {
    if (allowanceErc20 >= 0) {
      if (allowanceErc20 < parseFloat(input)) {
        return textosExtra[currentLanguage].aprobar;
      }
      if (balanceErc20 < parseFloat(input)) {
        return textosExtra[currentLanguage].bceInsuf;
      } else {
        return textosExtra[currentLanguage].comprar;
      }
    } else {
      return "hola??";
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <button
        onClick={() => {
          if (true) {
            Number(input) > allowanceErc20
              ? operationExecution(
                  approveErc20(
                    "0x1111111254eeb25477b68fb85ed929f73a960582",
                    ethers.utils.parseEther("99999999999")
                  )
                )
              : signer.sendTransaction(txData);
          }
        }}
        className="btnLarge"
      >
        {mensajeBoton()}
      </button>
    </>
  );
};

export default Boton1Inch;
