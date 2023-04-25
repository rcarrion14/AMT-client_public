import "./normalize.css";
import "./styles.css";

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Banner from "./components/Generales/Banner";
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import Marketplace from "./components/marketplace/Marketplace";
import Investidores from "./components/Investimentos/Investidores";
import GInvestidores from "./components/gInvestidores/GInvestidores";
import NavBar from "./components/Generales/NavBar";
import store from "./store/store";

import Loader from "./components/Generales/Loader";
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
      </Provider>
    </>
  );
}

export default App;
