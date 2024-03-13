import React from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";
import { textosExtra } from "../../Utils/textos";
import { RootState } from "../../store/store";

interface BotonOperacionProps {
  stackedByUser: BigNumber | undefined;
  balanceUserAmt: BigNumber | undefined;
  allowance: BigNumber | undefined;
  operacionAprobar: Function;
  operacionStake: Function;
  input: string;
  operacionWithdrawl: Function;
}
const BotonOperacion: React.FC<BotonOperacionProps> = ({
  balanceUserAmt,
  allowance,
  input,
  operacionAprobar,
  operacionStake,
  operacionWithdrawl,
  stackedByUser,
}) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const mesajeBoton = () => {
    if (input != "") {
      if (allowance && balanceUserAmt) {
        const inputParsed = ethers.utils.parseEther(input);
        if (allowance.lt(BigNumber.from(inputParsed))) {
          return textosExtra[currentLanguage].aprobar;
        }
        if (balanceUserAmt.lt(BigNumber.from(inputParsed))) {
          return textosExtra[currentLanguage].bceInsuf;
        } else {
          return textosExtra[currentLanguage].stake;
        }
      } else {
        return textosExtra[currentLanguage].stake;
      }
    } else {
      return textosExtra[currentLanguage].stake;
    }
  };
  const inputParsed =
    input != "" ? ethers.utils.parseEther(input) : ethers.BigNumber.from(0);

  const mensajeBotonStaking = () => {
    return stackedByUser && stackedByUser?.gt(0)
      ? textosExtra[currentLanguage].retirar
      : allowance && allowance.lt(inputParsed)
      ? textosExtra[currentLanguage].aprobar
      : balanceUserAmt && balanceUserAmt.lt(inputParsed)
      ? textosExtra[currentLanguage].bceInsuf
      : textosExtra[currentLanguage].stake;
  };

  const operacionesBotonStaking = () => {
    return stackedByUser && stackedByUser?.gt(0)
      ? operacionWithdrawl(dispatch)
      : allowance && allowance.lt(inputParsed)
      ? operacionAprobar(dispatch)
      : balanceUserAmt && balanceUserAmt.lt(inputParsed)
      ? undefined
      : operacionStake(dispatch, inputParsed);
  };
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div className="textoConexion">
        <button onClick={operacionesBotonStaking}>
          {mensajeBotonStaking()}
        </button>
      </div>
    </>
  );
};

export default BotonOperacion;
