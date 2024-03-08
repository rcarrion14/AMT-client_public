import "./normalize.css";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Banner from "./components/Generales/Banner";
import Home from "./components/Home/Home";
import Marketplace from "./components/marketplace/Marketplace";
import Investidores from "./components/Investimentos/Investidores";
import GInvestidores from "./components/gInvestidores/GInvestidores";
import NavBar from "./components/Generales/NavBar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { CSSTransition } from "react-transition-group";
import { toast } from "react-toastify";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://a8413093a0da8b9700f3aac115302c60@o4506875984936960.ingest.us.sentry.io/4506875987558400", // Ensure you replace "YOUR_SENTRY_DSN" with your actual DSN
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Add the userAgent as a tag
    event.tags = event.tags || {};
    event.tags.userAgent = navigator.userAgent;
    return event;
  },
});

// This is just for testing; remove it in production or adjust as needed
Sentry.captureMessage("Testing navigator.userAgent capture");
declare var ethereum: any;

function App() {
  const chain = (window as any).ethereum
    ? (window as any).ethereum.networkVersion
    : undefined;
  const pages = ["home", "marketplace", "investidores", "gInvestidores"];
  const [activePage, setActivePage] = useState<string | null>("home");

  const addr = useSelector((state: typeof RootState) => state.wallet.address);
  return (
    <>
      <Banner />
      <CSSTransition
        in={activePage == "home"}
        timeout={800}
        classNames="fade"
        unmountOnExit
      >
        <Home setActivePage={setActivePage} />
      </CSSTransition>
      <CSSTransition
        in={activePage == "marketplace"}
        timeout={800}
        classNames="fade"
        unmountOnExit
      >
        <Marketplace />
      </CSSTransition>
      <CSSTransition
        in={activePage == "investidores"}
        timeout={800}
        classNames="fade"
        unmountOnExit
      >
        <Investidores />
      </CSSTransition>
      <CSSTransition
        in={activePage == "gInvestidores"}
        timeout={800}
        classNames="fade"
        unmountOnExit
      >
        <GInvestidores />
      </CSSTransition>

      <div
        className={
          (addr && chain === "56") || chain === 56
            ? "navBarContainer"
            : "navBarContainer disabledContainer"
        }
      >
        <NavBar setActivePage={setActivePage} activePage={activePage} />
      </div>
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
    </>
  );
}

export default App;
