// @ts-nocheck

import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { textosExtra } from "../../Utils/textos";
import { RootState } from "../../store/store";

//CUANDO TERMINA LA OPERACION NO CAMBIA AMT DEPOSITADOS

interface BotonOperacionProps {
  stackedByUser: number | undefined;
  balanceUserAmt: number | undefined;
  allowance: number | undefined;
  operacionAprobar: Function;
  operacionStake: Function;
  input: string;
  operacionWithdrawl: Function;
}
const BotonOperacion: React.FC<BotonOperacionProps> = ({
  balanceUserAmt,
  allowance,
  input,
  operacionAprobar,
  operacionStake,
  operacionWithdrawl,
  stackedByUser,
}) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const mesajeBoton = () => {
    if (allowance >= 0) {
      if (allowance < parseFloat(input)) {
        return textosExtra[currentLanguage].aprobar;
      }
      if (balanceUserAmt < parseFloat(input)) {
        return textosExtra[currentLanguage].bceInsuf;
      } else {
        return textosExtra[currentLanguage].stake;
      }
    } else {
      return textosExtra[currentLanguage].stake;
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div className="doubleButtonContainer">
        <button
          className={stackedByUser > 0 ? null : "gris"}
          onClick={() => {
            console.log(operacionWithdrawl);

            operacionWithdrawl();
          }}
        >
          {textosExtra[currentLanguage].retirar}
        </button>
        <button
          className={stackedByUser > 0 ? "gris" : null}
          onClick={() => {
            if (allowance) {
              let monto = ethers.utils.parseEther(input);
              allowance > parseFloat(input)
                ? operacionStake(dispatch, monto)
                : operacionAprobar(dispatch);
            }
          }}
        >
          {mesajeBoton()}
        </button>
      </div>
    </>
  );
};

export default BotonOperacion;
