import { configureStore } from "@reduxjs/toolkit";
import btcbReducer from "./features/btcb/btcbSlice";

import walletReducer from "./features/wallet/walletSlice";
import amtReducer from "./features/amt/amtSlice";
import usdtSlice from "./features/usdt/usdtSlice";
import liqAmtSlice from "./features/liqAmt/liqAmtSlice";
import masterReducer from "./features/master/masterSlice";
import marketPlaceReducer from "./features/marketplace/marketPlaceSlice";
import vaultAmtReducer from "./features/vaultAmt/vaultAmtSlice";
import vaultBtcbReducer from "./features/vaultBtcb/vaultBtcbSlice";
import burnVaultReducer from "./features/burnVault/burnVaultSlice";
import sessionSliceReducer from "./features/session/sessionSlice";
const store = configureStore({
  reducer: {
    wallet: walletReducer,
    amt: amtReducer,
    usdt: usdtSlice,
    liqAmt: liqAmtSlice,
    master: masterReducer,
    marketPlace: marketPlaceReducer,
    vaultAmt: vaultAmtReducer,
    vaultBtcb: vaultBtcbReducer,
    btcb: btcbReducer,
    burnVault: burnVaultReducer,
    session: sessionSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export default store;
const {
  wallet,
  amt,
  usdt,
  liqAmt,
  master,
  marketPlace,
  vaultAmt,
  btcb,
  vaultBtcb,
  burnVault,
  session,
} = store.getState();
export const RootState = {
  wallet,
  amt,
  usdt,
  liqAmt,
  master,
  marketPlace,
  vaultAmt,
  btcb,
  vaultBtcb,
  burnVault,
  session,
};

export const getStaticState = store.getState;
