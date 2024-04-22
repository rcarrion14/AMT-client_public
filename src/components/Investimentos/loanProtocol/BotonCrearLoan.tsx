import React from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";
import { textosExtra } from "../../../Utils/textos";
import { RootState } from "../../../store/store";
interface BotonCrearLoanInterface {
  balanceUsdtLoanProtocol: BigNumber | undefined;
  balanceUserAmt: BigNumber | undefined;
  allowanceAmt: BigNumber | undefined;
  input: string;
  operacionAprobar: Function;
  operacionCrearLoan: Function;
}
const BotonCrearLoan: React.FC<BotonCrearLoanInterface> = ({
  balanceUsdtLoanProtocol,
  balanceUserAmt,
  allowanceAmt,
  input,
  operacionAprobar,
  operacionCrearLoan,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const mensajeBoton = () => {
    if (balanceUsdtLoanProtocol?.lt(ethers.utils.parseEther(input))) {
      return textosExtra[currentLanguage].noHaySuficientesUsdtEnElContrato;
    }
    if (allowanceAmt && ethers.utils.parseEther(input).gt(allowanceAmt)) {
      return textosExtra[currentLanguage].aprobar;
    }
    if (balanceUserAmt?.lt(ethers.utils.parseEther(input))) {
      return textosExtra[currentLanguage].bceInsuf;
    } else {
      return textosExtra[currentLanguage].crearLoan;
    }
  };

  return (
    <>
      <button
        onClick={() => {
          if (allowanceAmt) {
            ethers.utils.parseEther(input).gt(allowanceAmt)
              ? operacionAprobar(dispatch)
              : operacionCrearLoan(dispatch, ethers.utils.parseEther(input));
          }
        }}
        className="btnLarge"
      >
        {allowanceAmt && input != ""
          ? mensajeBoton()
          : textosExtra[currentLanguage].crearLoan}
      </button>
    </>
  );
};

export default BotonCrearLoan;
