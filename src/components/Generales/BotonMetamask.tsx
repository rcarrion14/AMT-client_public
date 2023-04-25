import { connectWallet } from "../../store/features/wallet/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

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
        }}
      >
        {!!address
          ? address.slice(0, 6) + " .... " + address.slice(37)
          : "Conectar billetera"}
      </button>
    </>
  );
};

export { BotonMetamask };
