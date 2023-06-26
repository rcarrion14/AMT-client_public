import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { operationExecution } from "../operationExecution";
import { getBalanceAmt, getBalanceUserAmt, setGeneratedAmtWaitingForUpdate, setGetNewDataTrigger } from "./vaultAmtSlice";
import { getAmtbalance } from "../amt/amtSlice";
import { updateBucketsData } from "../../../Utils/fetchBuckets";

function delay(t: any, v: any) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}
function stake(dispatch: AppDispatch, amount: number) {
  const contract = getStaticState().vaultAmt.contract;
  const operationPromise = contract.stake(amount);
  operationExecution(operationPromise).then(() => {
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceAmt());
    dispatch(getAmtbalance());
    dispatch(setGeneratedAmtWaitingForUpdate(true))
    delay(8000,0).then(()=>{
      updateBucketsData().then(()=>{
        dispatch(setGetNewDataTrigger())
      })
    })
  });
}

function withdrawl(dispatch: AppDispatch) {
  const contract = getStaticState().vaultAmt.contract;
  const operationPromise = contract.withdrwal();
  operationExecution(operationPromise).then(() => {
    dispatch(getBalanceUserAmt());
    dispatch(getBalanceAmt());
    dispatch(getAmtbalance());
  });
}

export const vaultAmtOperations = { stake, withdrawl };
