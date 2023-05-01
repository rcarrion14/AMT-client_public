// @ts-nocheck

import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { textosExtra } from "../../../Utils/textos";
import { RootState } from "../../../store/store";
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
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <button
      //Disabling the button conditions
      disabled={
        parseInt(balanceTienda) < parseInt(input) ||
        balanceUsdt < parseInt(input) ||
        input == ""
      }
      // onClick operations based on conditions
      onClick={() => {
        if (allowanceUsdt) {
          allowanceUsdt > parseInt(input)
            ? operacionBuy(dispatch, input)
            : operacionAprobar(dispatch);
        }
      }}
      className="btnLarge"
    >
      {
        //Posible texts of button based on conditions
        balanceTienda < parseInt(input)
          ? textosExtra[currentLanguage].noHaytantosAmtEnVenta
          : balanceUsdt < parseInt(input)
          ? textosExtra[currentLanguage].bceUSDTInsuficiente
          : parseInt(input) > allowanceUsdt
          ? textosExtra[currentLanguage].aprobar
          : textosExtra[currentLanguage].comprar
      }
    </button>
  );
};

export default BotonOperacionAmtStore;
