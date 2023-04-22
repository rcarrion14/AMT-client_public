import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
interface BotonOperacionProps {
  balanceUserAmt: string | null;
  stackedByUser: string | null;
  btcACobrar: string | null;
  allowance: string | null;
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
    if (parseInt(allowance) < parseInt(input)) {
      return "Aprobar";
    }
    if (parseInt(ethers.utils.formatEther(balanceUserAmt)) < parseInt(input)) {
      return "Balance insuf.";
    } else {
      return "Stake";
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      onClick={() => {
        if (allowance) {
          parseInt(allowance) > parseInt(input)
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
