import { connectWallet } from "../../store/features/wallet/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { textosExtra } from "../../Utils/textos";
// You can also use ESM `import * as Sentry from "@sentry/node"` instead of `require`
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://a8413093a0da8b9700f3aac115302c60@o4506875984936960.ingest.us.sentry.io/4506875987558400",
  integrations: [new ProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});
let a: any;
setTimeout(() => {
  try {
    console.log(a.a.a);
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

const BotonMetamask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const address = useSelector(
    (state: typeof RootState) => state.wallet.address
  );

  const appLink = "https://metamask.app.link/dapp/app.autominingtoken.com/";
  Sentry.captureMessage(navigator.userAgent);
  if (
    navigator.userAgent.indexOf("Mobile") != -1 && // Estoy en mobile pero NO en metamask
    navigator.userAgent.indexOf("MetaMask") == -1
  ) {
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
