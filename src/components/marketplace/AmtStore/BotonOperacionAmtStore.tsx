import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

interface BotonOperacionProps {
  balanceTienda: number | undefined;
  balanceUsdt: number | undefined;
  allowanceUsdt: number | undefined;
  input: string;
  operacionAprobar: Function;
  operacionBuy: Function;
}
const BotonOperacionAmtStore: React.FC<BotonOperacionProps> = ({
  balanceTienda,
  allowanceUsdt,
  balanceUsdt,
  input,
  operacionAprobar,
  operacionBuy,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      //Disabling the button conditions
      disabled={
        //parseInt(format(balanceTienda)) < parseInt(input) ||
        balanceUsdt < parseInt(input) || input == ""
      }
      // onClick operations based on conditions
      onClick={() => {
        if (allowanceUsdt) {
          allowanceUsdt > parseInt(input)
            ? operacionAprobar(dispatch) //operacionBuy(dispatch, input)
            : operacionAprobar(dispatch);
        }
      }}
      className="btnLarge"
    >
      {
        //Posible texts of button based on conditions
        //balanceTienda < parseInt(input)
        false
          ? "No hay tantos amt en venta"
          : balanceUsdt < parseInt(input)
          ? "Balance insuficiente"
          : //parseInt(input) > allowanceUsdt
          true
          ? "Approve"
          : "buy"
      }
    </button>
  );
};

export default BotonOperacionAmtStore;

/*   const logicaBoton = () => {
    if (balanceTienda < input) {
      return { texto: "No hay a la venta", operacion: null };
    }
    if (allowanceUsdt <= input) {
      return {
        texto: "Aprobar",
        operacion: () => {
          operacionAprobar("9999999999999999999999");
        },
      };
    }
    if (balanceUsdt < input) {
      return { texto: "Balance insuf.", operacion: null };
    } else {
      return {
        texto: "Comprar",
        operacion: (amount) => operacionBuy(amount),
      };
    }
  }; */
