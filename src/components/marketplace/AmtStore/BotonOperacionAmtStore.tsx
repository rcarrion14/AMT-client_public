import React from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";
import { textosExtra } from "../../../Utils/textos";
import { RootState } from "../../../store/store";
interface BotonOperacionProps {
  balanceTienda: BigNumber | undefined;
  balanceUsdt: BigNumber | undefined;
  allowanceUsdt: BigNumber | undefined;
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

  const mensajeBoton = () => {
    if (balanceTienda?.lt(ethers.utils.parseEther(input))) {
      return textosExtra[currentLanguage].noHaytantosAmtEnVenta;
    }
    if (allowanceUsdt && ethers.utils.parseEther(input).gt(allowanceUsdt)) {
      return textosExtra[currentLanguage].aprobar;
    }
    if (balanceUsdt?.lt(ethers.utils.parseEther(input))) {
      return textosExtra[currentLanguage].bceInsuf;
    } else {
      return textosExtra[currentLanguage].comprar;
    }
  };

  return (
    <>
      <button
        onClick={() => {
          if (allowanceUsdt && allowanceUsdt.gte(0)) {
            allowanceUsdt?.gt(ethers.utils.parseEther(input))
              ? operacionBuy(dispatch, ethers.utils.parseEther(input))
              : operacionAprobar(dispatch);
          }
        }}
        className="btnLarge"
      >
        {allowanceUsdt && allowanceUsdt.gte(0) && input != ""
          ? mensajeBoton()
          : textosExtra[currentLanguage].comprar}
      </button>
    </>
  );
};

export default BotonOperacionAmtStore;
