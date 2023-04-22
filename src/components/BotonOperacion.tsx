import React, { useEffect, useState } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
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
      onClick={() => {
        if (allowanceUsdt) {
          parseInt(allowanceUsdt) > parseInt(input)
            ? operacionBuy(dispatch, input)
            : operacionAprobar(dispatch);
        }
      }}
      className="btnLarge"
    >
      {!!allowanceUsdt
        ? input
          ? parseInt(allowanceUsdt) > parseInt(input)
            ? "buy"
            : "approve"
          : "ponga un valor"
        : ""}
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
