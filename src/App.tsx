import "./normalize.css";
import "./styles.css";

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Banner from "./components/Banner";
import Home from "./components/Home";
import { Provider } from "react-redux";
import Marketplace from "./components/marketplace/Marketplace";
import Investidores from "./components/investidores/Investidores";
import GInvestidores from "./components/gInvestidores/GInvestidores";
import NavBar from "./components/NavBar";
import store from "./store/store";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../src/store/store";
import { generalLoadBtcb } from "./store/features/btcb/btcbSlice";
import Loader from "./components/Loader";
function App() {
  const pages = ["home", "marketplace", "investidores", "gInvestidores"];
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <Provider store={store}>
        <Loader></Loader>
        <Banner />
        <div className="containerLengueta">
          {activePage == "home" ? <Home setActivePage={setActivePage} /> : null}
          {activePage == "marketplace" ? <Marketplace /> : null}
          {activePage == "investidores" ? <Investidores /> : null}
          {activePage == "gInvestidores" ? <GInvestidores /> : null}
        </div>
        <NavBar setActivePage={setActivePage} activePage={activePage} />
        {/*<div className="containerSlide"><TradingViewWidget /> </div>*/}
      </Provider>
    </>
  );
}

export default App;
