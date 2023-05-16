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

  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div className="doubleButtonContainer">
        <button
          className={
            stackedByUser
              ? stackedByUser.gt(0)
                ? undefined
                : "gris"
              : undefined
          }
          onClick={() => {
            operacionWithdrawl(dispatch);
          }}
        >
          {textosExtra[currentLanguage].retirar}
        </button>
        <button
          className={
            stackedByUser
              ? stackedByUser.gt(0)
                ? "gris"
                : undefined
              : undefined
          }
          onClick={() => {
            if (allowance) {
              let monto = ethers.utils.parseEther(input);
              allowance.gt(BigNumber.from(monto))
                ? operacionStake(dispatch, monto)
                : operacionAprobar(dispatch);
            }
          }}
        >
          {mesajeBoton()}
        </button>
      </div>
    </>
  );
};

export default BotonOperacion;
