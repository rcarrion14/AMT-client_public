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

import {
  generalLoadVaultBtcbLiquidity,
  createContract as createContractVaultBtcbLiquidity,
} from "../../store/features/vaultBtcbLiquidity/vaultBtcbLiquiditySlice";

import {
  burnVaultLoaders,
  createContract as createContractBurnVault,
} from "../../store/features/burnVault/burnVaultSlice";

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
        console.log("creating contracts");
        var contractPromises: Promise<any>[] = [];
        //Load contracts
        contractPromises.push(dispatch(createContractAmt()));
        contractPromises.push(dispatch(createContractBtcb()));
        contractPromises.push(dispatch(createContractMarketPlace()));
        contractPromises.push(dispatch(createContractMaster()));
        contractPromises.push(dispatch(createContractUsdt()));
        contractPromises.push(dispatch(createContractVaultAmt()));
        contractPromises.push(dispatch(createContractVaultBtcb()));
        contractPromises.push(dispatch(createCotractLiqAmt()));
        contractPromises.push(dispatch(createContractBurnVault()));
        contractPromises.push(dispatch(createContractVaultBtcbLiquidity()));

        Promise.all(contractPromises).then(() => {
          //Initial general loads
          generalLoadBtcb(dispatch);
          generalLoadUsdt(dispatch);
          generalLoadMarketPlace(dispatch);
          const amtLoadedPromise = amtLoaders.generalLoadAmt(dispatch);
          liqAmtLoaders.generalLoadLiqAmt(dispatch);
          generalLoadVaultAmt(dispatch);
          generalLoadVaultBtcb(dispatch);
          burnVaultLoaders.generalLoad(dispatch);
          generalLoadVaultBtcbLiquidity(dispatch);
          amtLoadedPromise.then(() => {
            if (!!currentSnapshot) {
              masterLoaders.generalLoad(dispatch, currentSnapshot);
              amtLoaders.loaderWithSnapshots(dispatch, currentSnapshot);
            }
          });
        });
      }
      load();
    }
  }, [isConnected]);

  useEffect(() => {
    try {
      //Loads with snapshot
      if (currentSnapshot) {
        masterLoaders.generalLoad(dispatch, currentSnapshot);
        amtLoaders.loaderWithSnapshots(dispatch, currentSnapshot);
        liqAmtLoaders.loadBalancesOfAt(dispatch, currentSnapshot);
        liqAmtLoaders.loadTotalSupplyAt(dispatch, currentSnapshot);
      }
    } catch {}
  }, [currentSnapshot, isConnected]);
  return <></>;
};

export default Loader;
