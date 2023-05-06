import contractAddresses from "../../../contracts/contractAddresses";
import { ethers } from "ethers";
import { operationExecution } from "../operationExecution";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { getAllowanceBurnVault, getAmtbalance } from "../amt/amtSlice";
import { getBalance as getBalanceBtcb } from "../btcb/btcbSlice";

function backingWithdrawl(dispatch: AppDispatch, amountToBurn: number) {
  const contract = getStaticState().burnVault.contract;
  const operationPromise = contract.backingWithdrawl(amountToBurn);
  operationExecution(operationPromise).then(() => {
    dispatch(getAllowanceBurnVault());
    dispatch(getAmtbalance());
    dispatch(getBalanceBtcb());
  });
}

export const burnVaultOperations = { backingWithdrawl };
