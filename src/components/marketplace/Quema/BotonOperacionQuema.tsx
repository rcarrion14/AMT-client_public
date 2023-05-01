import React from "react";
import { textosExtra } from "../../../Utils/textos";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

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

  const mesajeBoton = () => {
    if (allowanceAmt < parseFloat(input)) {
      return textosExtra.por.aprobar;
    }
    if (balanceAmt < parseFloat(input)) {
      return textosExtra.por.bceInsuf;
    } else {
      return textosExtra.por.quemar;
    }
  };

  return (
    <button
      onClick={() => {
        console.log(approveMarket);

        allowanceAmt > parseFloat(input)
          ? burn(dispatch, input)
          : approveMarket(dispatch);
      }}
      className="btnLarge quema"
    >
      {mesajeBoton()}
    </button>
  );
};

export default BotonOperacionQuema;
