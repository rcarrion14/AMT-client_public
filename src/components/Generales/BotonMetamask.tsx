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

  const appLink = "https://metamask.app.link/dapp/app.autominingtoken.com/";

  if (
    navigator.userAgent.indexOf("Mobile") != -1 && // Estoy en mobile pero NO en metamask
    navigator.userAgent.indexOf("MetaMask") == -1
  ) {
    if ((window as any).ethereum) {
      return (
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
      );
    } //capaz tiene otra wallet, hay que repensar este sistema, tratar de conectarlo
    return (
      <button style={{ zIndex: 99 }}>
        <a href={appLink}>{textosExtra[currentLanguage].conectarBilletera}</a>
      </button>
    );
  } else {
    return (
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
    );
  }
};

export { BotonMetamask };
