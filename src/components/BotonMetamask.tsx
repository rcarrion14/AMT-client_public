import { connectWallet } from "../store/features/wallet/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
<<<<<<< HEAD
=======
import { generalLoadBtcb } from "../store/features/btcb/btcbSlice";
import { amtLoaders } from "../store/features/amt/amtSlice";
>>>>>>> main

const BotonMetamask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const address = useSelector(
    (state: typeof RootState) => state.wallet.address
  );
  return (
    <>
      <button
        onClick={() => {
          dispatch(connectWallet());
          //amtLoaders.generalLoadAmt(dispatch);

          /*
          amtLoaders.generalLoadAmt(dispatch);
        generalLoadBtcb(dispatch);
        generalLoadUsdt(dispatch);
        
        generalLoadMarketPlace(dispatch);
        console.log("hola");
        */
        }}
      >
        {!!address ? address : "Conectar billetera"}
      </button>
    </>
  );
};

export { BotonMetamask };
