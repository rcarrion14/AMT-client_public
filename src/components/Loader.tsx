import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { generalLoadBtcb } from "../store/features/btcb/btcbSlice";
import { generalLoadUsdt } from "../store/features/usdt/usdtSlice";
import { generalLoadMarketPlace } from "../store/features/marketplace/marketPlaceSlice";
import { amtLoaders } from "../store/features/amt/amtSlice";
import { liqAmtLoaders } from "../store/features/liqAmt/liqAmtSlice";
import { masterLoaders } from "../store/features/master/masterSlice";
import { generalLoadVaultAmt } from "../store/features/vaultAmt/vaultAmtSlice";

const Loader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useSelector(
    (state: typeof RootState) => state.wallet.address
  );
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    if (isConnected) {
      async function load() {
        generalLoadBtcb(dispatch);
        generalLoadUsdt(dispatch);
        generalLoadMarketPlace(dispatch);
        amtLoaders.generalLoadAmt(dispatch);
        liqAmtLoaders.generalLoadLiqAmt(dispatch);
        masterLoaders.generalLoad(dispatch, 234); //change to dynamic current
        generalLoadVaultAmt(dispatch);
        await delay(1000);
        generalLoadBtcb(dispatch);
        generalLoadUsdt(dispatch);
        generalLoadMarketPlace(dispatch);
        amtLoaders.generalLoadAmt(dispatch);
        liqAmtLoaders.generalLoadLiqAmt(dispatch);
        masterLoaders.generalLoad(dispatch, 234); //change to dynamic current
        generalLoadVaultAmt(dispatch);
        amtLoaders.loaderWithSnapshots(dispatch, 234);
      }
      load();
    }
  }, [isConnected]);
  return <></>;
};

export default Loader;
