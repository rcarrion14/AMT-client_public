import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  generalLoadBtcb,
  createContract as createContractBtcb,
} from "../../store/features/btcb/btcbSlice";
import {
  generalLoadUsdt,
  createContract as createContractUsdt,
} from "../../store/features/usdt/usdtSlice";
import {
  generalLoadMarketPlace,
  createContract as createContractMarketPlace,
} from "../../store/features/marketplace/marketPlaceSlice";
import {
  amtLoaders,
  createContract as createContractAmt,
} from "../../store/features/amt/amtSlice";
import {
  liqAmtLoaders,
  createContract as createCotractLiqAmt,
} from "../../store/features/liqAmt/liqAmtSlice";
import {
  masterLoaders,
  createContract as createContractMaster,
} from "../../store/features/master/masterSlice";
import {
  generalLoadVaultAmt,
  createContract as createContractVaultAmt,
} from "../../store/features/vaultAmt/vaultAmtSlice";
import {
  generalLoadVaultBtcb,
  createContract as createContractVaultBtcb,
} from "../../store/features/vaultBtcb/vaultBtcbSlice";

const Loader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useSelector(
    (state: typeof RootState) => state.wallet.address
  );

  const currentSnapshot = useSelector(
    (state: typeof RootState) => state.amt.currentSnapshot
  );
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    if (isConnected) {
      async function load() {
        console.log("createing contracts");
        //Load contracts
        dispatch(createContractAmt);
        dispatch(createContractBtcb);
        dispatch(createContractMarketPlace);
        dispatch(createContractMaster);
        dispatch(createContractUsdt);
        dispatch(createContractVaultAmt);
        dispatch(createContractVaultBtcb);
        dispatch(createCotractLiqAmt);
        await delay(1000);
        //Initial general loads
        generalLoadBtcb(dispatch);
        generalLoadUsdt(dispatch);
        generalLoadMarketPlace(dispatch);
        amtLoaders.generalLoadAmt(dispatch);
        liqAmtLoaders.generalLoadLiqAmt(dispatch);
        generalLoadVaultAmt(dispatch);
        generalLoadVaultBtcb(dispatch);
        await delay(1000);

        //Second general loads
        generalLoadBtcb(dispatch);
        generalLoadUsdt(dispatch);
        generalLoadMarketPlace(dispatch);
        amtLoaders.generalLoadAmt(dispatch);
        liqAmtLoaders.generalLoadLiqAmt(dispatch);
        generalLoadVaultAmt(dispatch);
        generalLoadVaultBtcb(dispatch);
        await delay(1000);

        //Loads with snapshot
        if (!!currentSnapshot) {
          masterLoaders.generalLoad(dispatch, currentSnapshot);
          amtLoaders.loaderWithSnapshots(dispatch, currentSnapshot);
        }
        await delay(1000);
        //Loads with snapshot
        if (!!currentSnapshot) {
          masterLoaders.generalLoad(dispatch, currentSnapshot);
          amtLoaders.loaderWithSnapshots(dispatch, currentSnapshot);
        }
      }
      load();
    }
  }, [isConnected]);

  useEffect(() => {
    try {
      //Loads with snapshot
      masterLoaders.generalLoad(dispatch, currentSnapshot);
      amtLoaders.loaderWithSnapshots(dispatch, currentSnapshot);
      liqAmtLoaders.loadBalancesOfAt(dispatch, currentSnapshot);
      liqAmtLoaders.loadTotalSupplyAt(dispatch, currentSnapshot);
    } catch {
      console.log("currentSnap: " + currentSnapshot);
    }
  }, [currentSnapshot, isConnected]);
  return <></>;
};

export default Loader;
