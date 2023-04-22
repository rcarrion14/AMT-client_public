import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

import { operationExecution } from "../operationExecution";
import { getAmtbalance } from "../amt/amtSlice";
import { getBalance as getUsdtBalance } from "../usdt/usdtSlice";

function buy(dispatch: AppDispatch, amount: number) {
  const contract = getStaticState().marketPlace.contract;
  const operationPromise = contract.buy(amount);
  operationExecution(operationPromise).then(() => {
    dispatch(getUsdtBalance());
    dispatch(getAmtbalance());
  });
}
export const marketPlaceOperations = {
  buy,
};
