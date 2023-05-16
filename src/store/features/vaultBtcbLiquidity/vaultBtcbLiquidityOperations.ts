import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { operationExecution } from "../operationExecution";
import {
  getBalanceAmt,
  getBalanceUserAmt,
  getBalanceUserBtcb,
} from "./vaultBtcbLiquiditySlice";

import { BigNumber } from "ethers";
import { getBalance } from "../liqAmt/liqAmtSlice";

function stake(dispatch: AppDispatch, amount: BigNumber) {
  const contract = getStaticState().vaultBtcbLiquidity.contract;
  const operationPromise = contract.stake(amount);
  operationExecution(operationPromise).then(() => {
    dispatch(getBalance());
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceUserBtcb());
    dispatch(getBalanceAmt());
  });
}

function withdrawl(dispatch: AppDispatch) {
  const contract = getStaticState().vaultBtcbLiquidity.contract;
  const operationPromise = contract.withdrwal();
  operationExecution(operationPromise).then(() => {
    dispatch(getBalance());
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceUserBtcb());
    dispatch(getBalanceAmt());
  });
}

export const vaultBtcbLiquidityOperations = { stake, withdrawl };
