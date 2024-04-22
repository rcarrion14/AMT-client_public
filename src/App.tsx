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
  const pages = ["home", "marketplace", "investidores", "gInvestidores"];
  const [activePage, setActivePage] = useState<string | null>("home");

  const [chainId, setChainId] = useState<string | number | undefined>(
    undefined
  );
  const addr = useSelector((state: typeof RootState) => state.wallet.address);
  const provider = useSelector(
    (state: typeof RootState) => state.wallet.provider
  );
  // Function to show a toast notification
  const checkChainId = async () => {
    if ((window as any).ethereum) {
      setChainId(
        await (window as any).ethereum.request({ method: "eth_chainId" })
      );
      console.log(chainId);
    }
  };

  // Using useEffect to show the toast on component mount
  useEffect(() => {
    checkChainId();
  }, [provider]);
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
          (addr && chainId === "56") ||
          (addr && chainId === 56) ||
          (addr && chainId === "0x38") ||
          (addr && chainId === 0x38)
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
