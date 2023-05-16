// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { masterOperations } from "../../../../store/features/master/masterOperations";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";

const BotonRetirarLiquidez = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const balanceLiqAmt = useSelector(
    (state: typeof RootState) => state.liqAmt.balance
  );
  return (
    <button
      className=""
      onClick={() =>
        balanceLiqAmt && balanceLiqAmt.gt(0)
          ? masterOperations.removeLiquidity(dispatch, balanceLiqAmt)
          : null
      }
    >
      Retirar liquidez
    </button>
  );
};

export default BotonRetirarLiquidez;
