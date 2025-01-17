import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import {
  getUserLoans,
  getLoanRatio,
  getUsdtAvailable,
  getAllowanceAmtToLoanProtocol,
  getAllowanceUsdtToLoanProtocol,
} from "./loanProtocolSlice";
import { BigNumber } from "ethers";

import contractAddresses from "../../../contracts/contractAddresses";
import { ethers } from "ethers";
import { operationExecution } from "../operationExecution";
import { getBalance as getBalanceUsdt } from "../usdt/usdtSlice";
import { getBalanceAmt } from "../vaultAmt/vaultAmtSlice";

function approveAmtToLoanProtocol(dispatcher: AppDispatch) {
  const contract = getStaticState().amt.contract;
  const operationPromise = contract.approve(
    contractAddresses.loanProtocol,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceAmtToLoanProtocol());
  });
}

function approveUsdtToLoanProtocol(dispatcher: AppDispatch) {
  const contract = getStaticState().usdt.contract;
  const operationPromise = contract.approve(
    contractAddresses.loanProtocol,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceUsdtToLoanProtocol());
  });
}

function createLoan(dispatcher: AppDispatch, amtAmount: BigNumber) {
  const contract = getStaticState().loanProtocol.contract;
  if (contract) {
    const operationPromise = contract?.createLoan(amtAmount);
    operationExecution(operationPromise).then(() => {
      dispatcher(getAllowanceUsdtToLoanProtocol());
      dispatcher(getAllowanceAmtToLoanProtocol());
      dispatcher(getUserLoans());
      dispatcher(getBalanceAmt());
      dispatcher(getBalanceUsdt());
    });
  }
}

function closeLoan(
  dispatcher: AppDispatch,
  loanIndex: number,
  usdtAmount: BigNumber
) {
  const contract = getStaticState().loanProtocol.contract;
  if (contract) {
    const operationPromise = contract.closeLoan(loanIndex, usdtAmount);
    operationExecution(operationPromise).then(() => {
      dispatcher(getAllowanceUsdtToLoanProtocol());
      dispatcher(getUserLoans());
      dispatcher(getBalanceUsdt());
      dispatcher(getBalanceAmt());
    });
  }
}

export const loanProtocolOperations = {
  approveAmtToLoanProtocol,
  approveUsdtToLoanProtocol,
  createLoan,
  closeLoan,
};
