import { ethers } from "ethers";

const addrRouter_1inch = "0x1111111254eeb25477b68fb85ed929f73a960582";
const baseUrl = "https://api.1inch.io";

const approveUrl = "/v5.0/56/approve/transaction";
const tokenListUrl = "/v5.0/56/tokens";
const allowanceUrl = "/v5.0/56/approve/allowance";
const quoteUrl = "/v5.0/56/quote";
const swapUrl = "/v5.0/56/swap";

export const useGetQuote = async (
  addrForm: string,
  addrTo: string,
  amountSinFormato: string
) => {
  let endpoint = "https://api.1inch.io/v5.0/56/quote?";
  let from = "fromTokenAddress=" + addrForm;
  let to = "&toTokenAddress=" + addrTo;
  let amount = "&amount=" + ethers.utils.parseEther(amountSinFormato);
  let response = await fetch(endpoint + from + to + amount);
  let data = await response.json();
  return data;
};

export const useGetTxData = async (
  addrForm: string,
  addrTo: string,
  amountSinFormato: string,
  addr: string
) => {
  let endpoint = "https://api.1inch.io/v5.0/56/swap?";

  let from = "fromTokenAddress=" + addrForm;
  let to = "&toTokenAddress=" + addrTo;
  let amount = "&amount=" + ethers.utils.parseEther(amountSinFormato);
  let fromAddr = "&fromAddress=" + addr;
  let slippage = "&slippage=1";
  let response = await fetch(
    endpoint + from + to + amount + fromAddr + slippage
  );
  let rawData = await response.json();
  const txData = {
    from: rawData.tx.from,
    to: rawData.tx.to,
    data: rawData.tx.data,
  };

  return txData;
};

export const useGetTokens = async () => {
  let endpoint = "https://api.1inch.io/v5.0/56/tokens";
  let response = await fetch(endpoint);
  let data = await response.json();
  return data.tokens;
};
