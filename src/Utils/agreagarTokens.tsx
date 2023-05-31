declare var window: any;

import contractAddresses from "../contracts/contractAddresses";
const ethereum = window.ethereum;
export const agregarAmt = async () => {

  await ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: contractAddresses.Amt,
        symbol: "AMT",
        decimals: 18,
        image:
          "https://golden-storage-production.s3.amazonaws.com/topic_images/ef55267487d24b24bf2ac48ae2212b16.png",
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
