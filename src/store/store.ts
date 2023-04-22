import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import btcbReducer from "./features/btcb/btcbSlice";

import walletReducer from "./features/wallet/walletSlice";
import amtReducer from "./features/amt/amtSlice";
import usdtSlice from "./features/usdt/usdtSlice";
import liqAmtSlice from "./features/liqAmt/liqAmtSlice";
import masterReducer from "./features/master/masterSlice";
import marketPlaceReducer from "./features/marketplace/marketPlaceSlice";
import vaultAmtReducer from "./features/vaultAmt/vaultAmtSlice";
<<<<<<< HEAD
=======
import vaultBtcbReducer from "./features/vaultBtcb/vaultBtcbSlice";
>>>>>>> main

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    wallet: walletReducer,
    amt: amtReducer,
    usdt: usdtSlice,
    liqAmt: liqAmtSlice,
    master: masterReducer,
    marketPlace: marketPlaceReducer,
    vaultAmt: vaultAmtReducer,
<<<<<<< HEAD
=======
    vaultBtcb: vaultBtcbReducer,
>>>>>>> main
    btcb: btcbReducer,
    //middleware: customizedMiddleware as any,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
<<<<<<< HEAD
const { wallet, amt, usdt, liqAmt, master, marketPlace, vaultAmt, btcb } =
=======
const { wallet, amt, usdt, liqAmt, master, marketPlace, vaultAmt, btcb, vaultBtcb } =
>>>>>>> main
  store.getState();
export const RootState = {
  wallet,
  amt,
  usdt,
  liqAmt,
  master,
  marketPlace,
  vaultAmt,
  btcb,
<<<<<<< HEAD
=======
  vaultBtcb,
>>>>>>> main
};

export const getStaticState = store.getState;
