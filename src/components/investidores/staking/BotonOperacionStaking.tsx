import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
interface BotonOperacionProps {
  balanceUserAmt: number | undefined;
  stackedByUser: number | undefined;
  btcACobrar: number | undefined;
  allowance: number | undefined;
  operacionAprobar: Function;
  operacionStake: Function;
  input: string;
}
const BotonOperacion: React.FC<BotonOperacionProps> = ({
  balanceUserAmt,
  stackedByUser,
  btcACobrar,
  allowance,
  input,
  operacionAprobar,
  operacionStake,
}) => {
  const mesajeBoton = () => {
    console.log();

    if (allowance && balanceUserAmt) {
      if (allowance < parseFloat(input)) {
        return "Aprobar";
      }
      if (balanceUserAmt < parseFloat(input)) {
        return "Balance insuf.";
      } else {
        return "Stake";
      }
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
