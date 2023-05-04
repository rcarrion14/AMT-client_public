// @ts-nocheck
import "./normalize.css";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Banner from "./components/Generales/Banner";
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import Marketplace from "./components/marketplace/Marketplace";
import Investidores from "./components/Investimentos/Investidores";
import GInvestidores from "./components/gInvestidores/GInvestidores";
import NavBar from "./components/Generales/NavBar";
import store from "./store/store";
import { ToastContainer } from "react-toastify";

import Loader from "./components/Generales/Loader";
import { CSSTransition } from "react-transition-group";
function App() {
  const pages = ["home", "marketplace", "investidores", "gInvestidores"];
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <Provider store={store}>
        <Loader></Loader>
        <Banner />
        <CSSTransition
          in={activePage == "home"}
          timeout={800}
          classNames="fade"
          unmountOnExit
        >
          <div className="containerLengueta">
            <Home setActivePage={setActivePage} />{" "}
          </div>
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
        ;
        <NavBar setActivePage={setActivePage} activePage={activePage} />
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
