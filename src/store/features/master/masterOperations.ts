import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

import { operationExecution } from "../operationExecution";
import { getBalance as btcbGetBalance } from "../btcb/btcbSlice";
import { getAmtbalance } from "../amt/amtSlice";
import { getBalance as liqAmtGetbalance } from "../liqAmt/liqAmtSlice";
import { masterLoaders } from "./masterSlice";

function addLiquidity(
  dispatch: AppDispatch,
  amountAmt: number,
  amountBtcb: number
) {
  const contract = getStaticState().master.contract;
  const operationPromise = contract.addLiquidity(amountAmt, amountBtcb);
  operationExecution(operationPromise).then(() => {
    dispatch(btcbGetBalance());
    dispatch(getAmtbalance);
    dispatch(liqAmtGetbalance());
  });
}

//Snapshot on screen represents the actual snapshot that is loaded in the state of the masterSlice
function charge(
  dispatch: AppDispatch,
  snapId: number,
  snapShotOnScreen: number
) {
  const contract = getStaticState().master.contract;
  const operationPromise = contract.charge(snapId);
  operationExecution(operationPromise).then(() => {
    dispatch(btcbGetBalance());
    masterLoaders.generalLoad(dispatch, snapShotOnScreen);
  });
}
function liqCharge(
  dispatch: AppDispatch,
  snapId: number,
  snapShotOnScreen: number
) {
  const contract = getStaticState().master.contract;
  const operationPromise = contract.liqCharge(snapId);
  operationExecution(operationPromise).then(() => {
    dispatch(btcbGetBalance());
    masterLoaders.generalLoad(dispatch, snapShotOnScreen);
  });
}
function mintMaster(dispatch: AppDispatch, account: string, amount: number) {
  const contract = getStaticState().master.contract;
  const operationPromise = contract.mintMaster(account, amount);
  operationExecution(operationPromise).then(() => {
    //Absolutamente todo?
  });
}
function payRent(
  dispatch: AppDispatch,
  amount: number,
  vaultParticipation: number
) {
  const contract = getStaticState().master.contract;
  const operationPromise = contract.payRent(amount, vaultParticipation);
  operationExecution(operationPromise).then(() => {
    dispatch(btcbGetBalance());
    //Todo del master?
  });
}
function removeLiquidity(dispatch: AppDispatch, amount: number) {
  const contract = getStaticState().master.contract;
  const operationPromise = contract.removeLiquidity(amount);
  operationExecution(operationPromise).then(() => {
    dispatch(btcbGetBalance());
    dispatch(getAmtbalance());
    dispatch(liqAmtGetbalance());
  });
}

export const masterOperations = {
  removeLiquidity,
  payRent,
  mintMaster,
  liqCharge,
  charge,
  addLiquidity,
};
