import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { operationExecution } from "../operationExecution";
import {
  getBalanceAmt,
  getBalanceUserAmt,
  getBalanceUserBtcb,
} from "./vaultBtcbSlice";
import { getAmtbalance } from "../amt/amtSlice";
import { updateBucketsData } from "../../../Utils/fetchBuckets";
import { setGetNewDataTrigger } from "../vaultAmt/vaultAmtSlice";
import { storeInCookies } from "../../../Utils/cookies";

function stake(dispatch: AppDispatch, amount: number) {
  const contract = getStaticState().vaultBtcb.contract;
  const operationPromise = contract.stake(amount);
  operationExecution(operationPromise).then(() => {
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceAmt());
    dispatch(getAmtbalance());
    dispatch(getBalanceUserBtcb());
    storeInCookies(amount);
    updateBucketsData().then(() => {
      dispatch(setGetNewDataTrigger());
    });
  });
}

function withdrawl(dispatch: AppDispatch) {
  const contract = getStaticState().vaultBtcb.contract;
  const operationPromise = contract.withdrwal();
  operationExecution(operationPromise).then(() => {
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceAmt());
    dispatch(getBalanceUserBtcb());
    dispatch(getAmtbalance());
  });
}

export const vaultBtcbOperations = { stake, withdrawl };
