import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { textosExtra } from "../../textos";

interface BotonOperacionProps {
  balanceUserAmt: number | undefined;
  allowance: number | undefined;
  operacionAprobar: Function;
  operacionStake: Function;
  input: string;
}
const BotonOperacion: React.FC<BotonOperacionProps> = ({
  balanceUserAmt,
  allowance,
  input,
  operacionAprobar,
  operacionStake,
}) => {
  console.log("REND");

  const mesajeBoton = () => {
    if (allowance) {
      if (allowance < parseFloat(input)) {
        return textosExtra.por.aprobar;
      }
      if (balanceUserAmt < parseFloat(input)) {
        return textosExtra.por.bceInsuf;
      } else {
        return textosExtra.por.stake;
      }
    } else {
      return "hola";
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      onClick={() => {
        if (allowance) {
          allowance > parseFloat(input)
            ? operacionStake(dispatch, input)
            : operacionAprobar(dispatch);
        }
      }}
      className="btnLarge"
    >
      {mesajeBoton()}
    </button>
  );
};

export default BotonOperacion;
