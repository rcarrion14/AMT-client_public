// @ts-nocheck

import contractAddresses from "../contracts/contractAddresses";

export const agregarAmt = async () => {
  console.log("agregndo AMT");

  await ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: contractAddresses.Amt,
        symbol: "AMT",
        decimals: 18,
        image:
          "https://autominingtoken.com/wp-content/uploads/2022/06/Agrupar-1-copiar-3.png",
      },
    },
  });
};

export const agregarBbtc = async () => {
  await ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: contractAddresses.Btcb,
        symbol: "BTCB",
        decimals: 18,
        image: "https://s2.coinmarketcap.com/static/img/coins/200x200/4023.png",
      },
    },
  });
};

export const agregarUsdt = async () => {
  await ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: contractAddresses.Usdt,
        symbol: "USDT",
        decimals: 18,
        image: "https://s2.coinmarketcap.com/static/img/coins/200x200/825.png",
      },
    },
  });
};
