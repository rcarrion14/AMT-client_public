import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { operationExecution } from "../operationExecution";
import { getBalanceAmt, getBalanceUserAmt, getBalanceUserBtcb } from "./vaultBtcbSlice";
import { getAmtbalance } from "../amt/amtSlice";

function stake(dispatch: AppDispatch, amount: number) {
  const contract = getStaticState().vaultBtcb.contract;
  const operationPromise = contract.stake(amount);
  operationExecution(operationPromise).then(() => {
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceAmt());
    dispatch(getAmtbalance());
    dispatch(getBalanceUserBtcb());
    
  });
}

function withdrawl(dispatch: AppDispatch) {
  const contract = getStaticState().vaultBtcb.contract;
  const operationPromise = contract.withdrawl();
  operationExecution(operationPromise).then(() => {
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceAmt());
    dispatch(getBalanceUserBtcb());
  });
}

export const vaultBtcbOperations = { stake, withdrawl };
