import { connectWallet } from "../../store/features/wallet/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { textosExtra } from "../../Utils/textos";
const BotonMetamask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const address = useSelector(
    (state: typeof RootState) => state.wallet.address
  );
  return (
    <>
      <button
        onClick={() => {
          dispatch(connectWallet());
        }}
        style={{ zIndex: 99 }}
      >
        {!!address
          ? address.slice(0, 6) + " .... " + address.slice(37)
          : textosExtra[currentLanguage].conectarBilletera}
      </button>
    </>
  );
};

export { BotonMetamask };
