import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import {
  getAllowanceMarketVault,
  getAllowanceMaster,
  getAllowanceVaultAmt,
  getAllowanceVaultBtcb,
  getAllowanceVaultBtcbLiq,
} from "./amtSlice";
import contractAddresses from "../../../contracts/contractAddresses";
import { ethers } from "ethers";
import { operationExecution } from "../operationExecution";

function approveMarketVault(dispatcher: AppDispatch) {
  const contract = getStaticState().amt.contract;
  const operationPromise = contract.approve(
    contractAddresses.MarketVault,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceMarketVault());
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
  approveMarketVault,
  approveVaultAmt,
  approveVaultBtcb,
  approveVaultBtcbLiq,
  approveMaster,
};
