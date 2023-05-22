import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import contractAddresses from "../../../contracts/contractAddresses";
import { ethers } from "ethers";
import { operationExecution } from "../operationExecution";
import { getAllowanceMaster, getAllowanceVaultBtcbLiq } from "./liqAmtSlice";

function approveMaster(dispatcher: AppDispatch) {
  const contract = getStaticState().liqAmt.contract;
  const operationPromise = contract.approve(
    contractAddresses.Master,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceMaster());
  });
}

function approveVaultBtcbLiq(dispatcher: AppDispatch) {
  const contract = getStaticState().liqAmt.contract;
  const operationPromise = contract.approve(
    contractAddresses.VaultBtcbLiq,
    ethers.utils.parseEther("99999999999999999999999")
  );
  operationExecution(operationPromise).then(() => {
    dispatcher(getAllowanceVaultBtcbLiq());
  });
}

export const liqAmtOperations = { approveMaster, approveVaultBtcbLiq };
