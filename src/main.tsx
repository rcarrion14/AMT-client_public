import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import Loader from "./components/Generales/Loader";

const expectedChainId = "0x38"; // "0x38" BSC

declare var ethereum: any;

async function changeNetwork() {
  if (true /* navigator.userAgent.indexOf("Mobile")!= -1 */) {
    ethereum.on("accountsChanged", () => window.location.reload());
    ethereum.on("chainChanged", () => window.location.reload());
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: expectedChainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: expectedChainId,
                chainName: "Binance Smart Chain Mainnet",
                rpcUrls: ["https://bsc-dataseed1.binance.org"] /* ... */,
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://bscscan.com"],
              },
            ],
          });
        } catch (addError) {}
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Loader></Loader>
      <App />
    </Provider>
  </React.StrictMode>
);

changeNetwork();
