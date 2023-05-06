import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import {
  getAllowanceMaster,
  getAllowanceMarket,
  getAllowanceBurnVault,
  getAllowanceVaultAmt,
  getAllowanceVaultBtcb,
  getAllowanceVaultBtcbLiq,
} from "./amtSlice";
import contractAddresses from "../../../contracts/contractAddresses";
import { ethers } from "ethers";
import { operationExecution } from "../operationExecution";

//to change to 2 new approve functions: approve market (when new market is done) and approve burnVault.
function approveMarket(dispatcher: AppDispatch) {
  const contract = getStaticState().amt.contract;
  const operationPromise = contract.approve(
    contractAddresses.marketPlace,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceMarket());
  });
}

function approveBurnVault(dispatcher: AppDispatch) {
  const contract = getStaticState().amt.contract;
  const operationPromise = contract.approve(
    contractAddresses.burnVault,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceBurnVault());
  });
}

function approveVaultAmt(dispatcher: AppDispatch) {
  const contract = getStaticState().amt.contract;
  const operationPromise = contract.approve(
    contractAddresses.VaultAmt,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceVaultAmt());
  });
}

function approveVaultBtcb(dispatcher: AppDispatch) {
  const contract = getStaticState().amt.contract;
  const operationPromise = contract.approve(
    contractAddresses.VaultBtcb,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceVaultBtcb());
  });
}

function approveVaultBtcbLiq(dispatcher: AppDispatch) {
  const contract = getStaticState().amt.contract;
  const operationPromise = contract.approve(
    contractAddresses.VaultBtcbLiq,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceVaultBtcbLiq());
  });
}

function approveMaster(dispatcher: AppDispatch) {
  const contract = getStaticState().amt.contract;
  const operationPromise = contract.approve(
    contractAddresses.Master,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceMaster());
  });
}

export const amtOperations = {
  approveBurnVault,
  approveMarket,
  approveVaultAmt,
  approveVaultBtcb,
  approveVaultBtcbLiq,
  approveMaster,
};
