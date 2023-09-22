import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

import { operationExecution } from "../operationExecution";
import { getAmtbalance } from "../amt/amtSlice";
import { getBalance as getUsdtBalance } from "../usdt/usdtSlice";
import { getAmtEnVenta } from "./marketPlaceSlice";
import { Market } from "../../../contracts/Interfaces/Market";

function buy(dispatch: AppDispatch, amount: number) {
  console.log("Amount a comprar",amount)
  const contract = getStaticState().marketPlace.contract as Market;
  const operationPromise = contract.buy(amount);
  operationExecution(operationPromise).then(() => {
    dispatch(getUsdtBalance());
    dispatch(getAmtbalance());
    dispatch(getAmtEnVenta());
  });
}
export const marketPlaceOperations = {
  buy,
};
