// @ts-nocheck
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
import { RootState } from "../../store/store";
import { CSSTransition } from "react-transition-group";

function App() {
  const pages = ["home", "marketplace", "investidores", "gInvestidores"];
  const [activePage, setActivePage] = useState("home");
  const customToastContainerStyle = {
    display: "flex",
    left: 0,
  };
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
        <div className="containerLengueta">
          <Marketplace />{" "}
        </div>
      </CSSTransition>
      <CSSTransition
        in={activePage == "investidores"}
        timeout={800}
        classNames="fade"
        unmountOnExit
      >
        <div className="containerLengueta">
          <Investidores />{" "}
        </div>
      </CSSTransition>
      <CSSTransition
        in={activePage == "gInvestidores"}
        timeout={800}
        classNames="fade"
        unmountOnExit
      >
        <div className="containerLengueta">
          <GInvestidores />{" "}
        </div>
      </CSSTransition>

      <div className={addr ? undefined : "disabledContainer"}>
        <NavBar setActivePage={setActivePage} activePage={activePage} />
      </div>
      <ToastContainer style={customToastContainerStyle} />
    </>
  );
}

export default App;
