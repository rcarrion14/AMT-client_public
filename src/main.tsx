import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store, { RootState, getStaticState } from "./store/store";
import Loader from "./components/Generales/Loader";
import { ethers } from "ethers";
const expectedChainId = "0x38"; // "0x38" BSC

declare var window: any;

async function changeNetwork() {
  if (true /* navigator.userAgent.indexOf("Mobile")!= -1 */) {
    window.ethereum.on("accountsChanged", async () => {
      if(!window.ethereum.isTrustWallet) {
        window.location.reload()
      }
      else{
        if(getStaticState().wallet.address){
          window.location.reload()
        }
      }
    });
    window.ethereum.on("chainChanged", () => {
      window.location.reload()
    });
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: expectedChainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
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
