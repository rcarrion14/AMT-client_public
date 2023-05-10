// @ts-nocheck

import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { textosExtra } from "../../../Utils/textos";
import { BigNumber, ethers } from "ethers";
import { operationExecution } from "../../../store/features/operationExecution";

interface BotonOperacionProps {
  balanceAmt: BigNumber | undefined;
  balanceErc20: BigNumber | undefined;
  allowanceErc20: BigNumber | undefined;
  txData: string;
  input: string;
  signer: any;
  approveErc20: Function;
  toggler: any;
  setToggler: any;
}
const BotonOperacion: React.FC<BotonOperacionProps> = ({
  balanceAmt,
  balanceErc20,
  allowanceErc20,
  txData,
  input,
  signer,
  approveErc20,
  addr,
  toggler,
  setToggler,
}) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const mensajeBoton = () => {
    console.log({ input, allowanceErc20, balanceErc20 });

    if (ethers.utils.parseEther(input).gt(allowanceErc20)) {
      return textosExtra[currentLanguage].aprobar;
    }
    if (balanceErc20.lt(ethers.utils.parseEther(input))) {
      return textosExtra[currentLanguage].bceInsuf;
    } else {
      return textosExtra[currentLanguage].comprar;
    }
  };

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
                ).then(() => {
                  setToggler(!toggler);
                })
              : operationExecution(signer.sendTransaction(txData)).then(() => {
                  setToggler(!toggler);
                });
          }
        }}
        className="btnLarge"
      >
        {input != "" && balanceErc20
          ? mensajeBoton()
          : textosExtra[currentLanguage].comprar}
      </button>
    </>
  );
};

export default BotonOperacion;
