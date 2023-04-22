import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { operationExecution } from "../operationExecution";
import { getBalanceAmt, getBalanceUserAmt } from "./vaultAmtSlice";
import { getAmtbalance } from "../amt/amtSlice";

function stake(dispatch: AppDispatch, amount: number) {
  const contract = getStaticState().vaultAmt.contract;
  const operationPromise = contract.stake(amount);
  operationExecution(operationPromise).then(() => {
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceAmt());
    dispatch(getAmtbalance());
  });
}

function withdrawl(dispatch: AppDispatch) {
  const contract = getStaticState().vaultAmt.contract;
  const operationPromise = contract.withdrawl();
  operationExecution(operationPromise).then(() => {
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceAmt());
  });
}

export const vaultAmtOperations = { stake, withdrawl };
