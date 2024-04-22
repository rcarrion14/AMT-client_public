import "./normalize.css";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
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

function App() {
  const chain = (window as any).ethereum
    ? (window as any).ethereum.networkVersion
    : undefined;

  const provider = useSelector(
    (state: typeof RootState) => state.wallet.address
  );
  let chain2;
  const pages = ["home", "marketplace", "investidores", "gInvestidores"];
  const [activePage, setActivePage] = useState<string | null>("home");

  const addr = useSelector((state: typeof RootState) => state.wallet.address);

  // Function to show a toast notification
  const showWelcomeToast = async () => {
    //@ts-ignore
    chain2 = await provider.request({ method: "eth_chainId" });
    toast(
      "Welcome to our website!" +
        "address: " +
        addr +
        "chain id: " +
        chain +
        "otro chainId: " +
        chain2,
      {
        position: toast.POSITION.TOP_LEFT,
      }
    );
  };

  // Using useEffect to show the toast on component mount
  useEffect(() => {
    showWelcomeToast();
  }, []);
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

      <div className={"navBarContainer"}>
        <NavBar setActivePage={setActivePage} activePage={activePage} />
      </div>
      <ToastContainer position={toast.POSITION.TOP_LEFT} />
    </>
  );
}

export default App;
