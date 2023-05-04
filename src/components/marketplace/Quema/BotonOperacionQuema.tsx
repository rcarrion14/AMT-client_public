// @ts-nocheck

import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { textosExtra } from "../../../Utils/textos";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { RootState } from "../../../store/store";

interface BotonOperacionQuemaProps {
  balanceAmt: number | undefined;
  balanceBtcb: number | undefined;
  allowanceAmt: number | undefined;
  backRate: number | undefined;
  approveMarket: Function;
  burn: Function;
  input: string;
}

const BotonOperacionQuema: React.FC<BotonOperacionQuemaProps> = ({
  balanceAmt,
  balanceBtcb,
  allowanceAmt,
  backRate,
  approveMarket,
  burn,
  input,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const mesajeBoton = () => {
    if (allowanceAmt < parseFloat(input)) {
      return textosExtra[currentLanguage].aprobar;
    }
    if (balanceAmt < parseFloat(input)) {
      return textosExtra[currentLanguage].bceInsuf;
    } else {
      return textosExtra[currentLanguage].quemar;
    }
  };

  return (
    <button
      onClick={() => {
        allowanceAmt > parseFloat(input)
          ? burn(dispatch, ethers.utils.parseEther(input))
          : approveMarket(dispatch);
      }}
      className="btnLarge quema"
    >
      {mesajeBoton()}
    </button>
  );
};

export default BotonOperacionQuema;
