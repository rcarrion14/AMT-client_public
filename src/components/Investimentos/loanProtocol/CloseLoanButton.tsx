import React from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";
import { textosExtra } from "../../../Utils/textos";
import { RootState } from "../../../store/store";
import { loanProtocolOperations } from "../../../store/features/loanProtocol/loanProtocolOperations";
interface CloseLoanButtonInterface {
  amountToClose: BigNumber;
  loanIndex: number;
}
const CloseLoanButton: React.FC<CloseLoanButtonInterface> = ({
  amountToClose,
  loanIndex,
}) => {
  const balanceUsdt = useSelector(
    (state: typeof RootState) => state.usdt.balance
  );
  const allowanceUsdt = useSelector(
    (state: typeof RootState) => state.loanProtocol.allowanceUsdtToLoanProtocol
  );

  const totalLoan = useSelector(
    (state: typeof RootState) => state.loanProtocol.userLoans
  );

  const operacionAprobar = loanProtocolOperations.approveUsdtToLoanProtocol;
  const operacionCerrarLoan = loanProtocolOperations.closeLoan;
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const mensajeBoton = () => {
    return allowanceUsdt &&
      balanceUsdt &&
      totalLoan != undefined &&
      totalLoan[loanIndex].amountBorrowed
      ? amountToClose.gt(allowanceUsdt)
        ? textosExtra[currentLanguage].aprobar
        : amountToClose.gt(balanceUsdt)
        ? textosExtra[currentLanguage].bceInsuf
        : "Cerrar Loan"
      : "-";
  };

  const buttonOperation = () => {
    return allowanceUsdt &&
      balanceUsdt &&
      totalLoan != undefined &&
      totalLoan[loanIndex].amountBorrowed
      ? amountToClose.gt(allowanceUsdt)
        ? () => {
            operacionAprobar(dispatch);
          }
        : amountToClose.gt(balanceUsdt)
        ? () => {}
        : () => {
            operacionCerrarLoan(
              dispatch,
              loanIndex,
              amountToClose.gt(totalLoan[loanIndex].amountBorrowed)
                ? totalLoan[loanIndex].amountBorrowed
                : amountToClose
            );
          }
      : () => {};
  };

  return (
    <>
      <button onClick={buttonOperation()} className="btnLarge">
        {mensajeBoton()}
      </button>
    </>
  );
};

export default CloseLoanButton;
