import React, { useEffect } from "react";

const addrRouter_1inch = "0x1111111254eeb25477b68fb85ed929f73a960582";
const baseUrl = "https://api.1inch.io";

const approveUrl = "/v5.0/56/approve/transaction";
const tokenListUrl = "/v5.0/56/tokens";
const allowanceUrl = "/v5.0/56/approve/allowance";
const quoteUrl = "/v5.0/56/quote";
const swapUrl = "/v5.0/56/swap";

const inch = () => {
  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://api.1inch.io/v5.0/56/tokens");
      let data = await response.json();
      return data;
    }
    const data = fetchData();
  });

  return <div>inch</div>;
};

export default inch;
