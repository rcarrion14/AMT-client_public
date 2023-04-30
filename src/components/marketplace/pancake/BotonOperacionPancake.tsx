// @ts-nocheck

import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";

import { textosExtra } from "../../../Utils/textos";
import { ethers } from "ethers";

interface BotonOperacionProps {
  balanceAmt: number | undefined;
  balanceErc20: number | undefined;
  allowanceErc20: number | undefined;
  txData: string;
  input: string;
  signer: any;
  approveErc20: any;
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
}) => {
  const mensajeBoton = () => {
    if (allowanceErc20 >= 0) {
      if (allowanceErc20 < parseFloat(input)) {
        return textosExtra.por.aprobar;
      }
      if (balanceErc20 < parseFloat(input)) {
        return textosExtra.por.bceInsuf;
      } else {
        return "Comprar";
      }
    } else {
      return "hola";
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <button
        onClick={() => {
          if (true) {
            Number(input) > allowanceErc20
              ? approveErc20(
                  "0x1111111254eeb25477b68fb85ed929f73a960582",
                  ethers.utils.parseEther("99999999999")
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

export default BotonOperacion;
