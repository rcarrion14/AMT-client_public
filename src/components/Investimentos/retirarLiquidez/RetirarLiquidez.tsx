import React, { useRef } from "react";
import { textoLiquidez, textosExtra } from "../../../Utils/textos";
import CuadroProveerLiquidez from "../liquidez/CuadroProveerLiquidez";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { current } from "@reduxjs/toolkit";
import DoughnutChart from "./DoughnutChart";
interface LiquidezInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const RetirarLiquidez: React.FC<LiquidezInterface> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const balanceLiqAmt = useSelector(
    (state: typeof RootState) => state.liqAmt.balance
  );

  const liqAmtTotalSupply = useSelector(
    (state: typeof RootState) => state.liqAmt.totalSupply
  );
  const balancePoolAmt = useSelector(
    (state: typeof RootState) => state.amt.balanceOfPool
  );

  const balancePoolBtc = useSelector(
    (state: typeof RootState) => state.btcb.balanceOfPool
  );

  const precioBtcb = 28500;
  const precioAmt = 0.67;
  let usdtEnAmt = 0;
  let usdtEnBtcb = 0;
  let amtEnLiquidez = 0;
  let btcbEnLiquidez = 0;
  if (balanceLiqAmt && liqAmtTotalSupply && balancePoolAmt && balancePoolBtc) {
    amtEnLiquidez = (balanceLiqAmt / liqAmtTotalSupply) * balancePoolAmt;
    btcbEnLiquidez = (balanceLiqAmt / liqAmtTotalSupply) * balancePoolBtc;
    usdtEnAmt = amtEnLiquidez * precioAmt;
    usdtEnBtcb = btcbEnLiquidez * precioBtcb;
  }

  const ref = useRef();

  console.log(usdtEnAmt);
  console.log(usdtEnBtcb);
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>{textosExtra[currentLanguage].inversiones}</h1>
      </div>
      <div style={{ display: "flex" }}>
        {" "}
        <h1>Saldo total: </h1>
        <h3>{usdtEnAmt + usdtEnBtcb}$</h3>
      </div>

      <DoughnutChart
        data={[usdtEnAmt + 10, usdtEnBtcb + 1]}
        labels={["AMT", "BTC"]}
      />

      <div className="containerSaldosLiquidez">
        <div className="leftSide">
          <img src="coinAutomining.png" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>texto</div>
            <p>mas texto</p>
          </div>
        </div>
        <div className="rightSide">
          <img src="coinBitcoin.png" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>texto</div>
            <p>mas texto</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirarLiquidez;
