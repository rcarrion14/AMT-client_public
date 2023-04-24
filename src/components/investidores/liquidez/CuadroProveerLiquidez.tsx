import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const CuadroProveerLiquidez = () => {
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );
  const balanceBtcb = useSelector(
    (state: typeof RootState) => state.btcb.balance
  );

  const balanceLiqAmt = useSelector(
    (state: typeof RootState) => state.liqAmt.balance
  );

  return <div>CuadroProveerLiquidez</div>;
};

export default CuadroProveerLiquidez;
