import React, { useEffect, useState } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { format, formatAllowances } from "./coinFormater";
import { ethers } from "ethers";

interface BotonOperacionProps {
  balanceTienda: string | null;
  balanceUsdt: string | null;
  allowanceUsdt: string | null;
  input: string;
  operacionAprobar: Function;
  operacionBuy: Function;
}
const BotonOperacion: React.FC<BotonOperacionProps> = ({
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
        parseInt(format(balanceUsdt)) < parseInt(input) || input == ""
      }
      // onClick operations based on conditions
      onClick={() => {
        console.log(allowanceUsdt);
        if (allowanceUsdt) {
          parseInt(formatAllowances(allowanceUsdt)) > parseInt(input)
            ? operacionBuy(dispatch, input)
            : operacionAprobar(dispatch);
        }
      }}
      className="btnLarge"
    >
      {
        //Posible texts of button based on conditions
        parseInt(format(balanceTienda)) < parseInt(input)
          ? "No hay tantos amt en venta"
          : parseInt(format(balanceUsdt)) < parseInt(input)
          ? "Balance insuficiente"
          : parseInt(input) > parseInt(formatAllowances(allowanceUsdt))
          ? "Approve"
          : "buy"
      }
    </button>
  );
};

export default BotonOperacion;

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
