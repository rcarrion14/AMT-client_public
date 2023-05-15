// @ts-nocheck
import React, { useRef } from "react";
import {
  textoLiquidez,
  textoRetirarLiquidez,
  textosExtra,
} from "../../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import DoughnutChart from "./DoughnutChart";
import BotonRetirarLiquidez from "./BotonRetirarLiquidez";
import { ethers } from "ethers";
import { toFrontEndString } from "../../../../Utils/formatHelpers";
const RetirarLiquidez: React.FC = () => {
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

  const precioBtcb = ethers.BigNumber.from(28500);

  //const precioAmt = balancePoolBtc.mul(precioBtcb).div(balanceLiqAmt)

  let usdtEnAmt = ethers.BigNumber.from(0);
  let usdtEnBtcb = ethers.BigNumber.from(0);
  let amtEnLiquidez = ethers.BigNumber.from(0);
  let btcbEnLiquidez = ethers.BigNumber.from(0);
  let poolParticipation = ethers.BigNumber.from(0);
  if (
    !balanceLiqAmt?.isZero() &&
    liqAmtTotalSupply &&
    balancePoolAmt &&
    balancePoolBtc
  ) {
    //
    poolParticipation = liqAmtTotalSupply.div(balanceLiqAmt);
    amtEnLiquidez = balancePoolAmt.div(poolParticipation);
    btcbEnLiquidez = balancePoolBtc.div(poolParticipation);
    usdtEnAmt = amtEnLiquidez.mul(
      balancePoolBtc.mul(precioBtcb).div(balanceLiqAmt)
    );
    /*     usdtEnAmt = amtEnLiquidez.mul(
      balancePoolBtc.mul(precioBtcb).div(balancePoolAmt)
    ); */
    usdtEnAmt = amtEnLiquidez
      .mul(balancePoolBtc)
      .mul(precioBtcb)
      .div(balancePoolAmt);

    usdtEnBtcb = btcbEnLiquidez.mul(precioBtcb);
  }

  return (
    <div className="containerSlideRetirarLiquidez">
      <div style={{ display: "flex", textAlign: "center" }}>
        <h1>Saldo total: </h1>
        <h3>{toFrontEndString(usdtEnAmt.add(usdtEnBtcb))}$</h3>
      </div>

      <div className="containerParticipacionEnPool">
        <b>{textosExtra[currentLanguage].participacionEnPool} </b>
        {ethers.utils.formatEther(
          poolParticipation.mul(ethers.BigNumber.from(100))
        )}
        %
      </div>
      <div className="containerSaldosLiquidez">
        <div className="leftSide">
          <img src="coinAutomining.png" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>AMT</div>
            <p>{amtEnLiquidez ? toFrontEndString(amtEnLiquidez) : "0"}</p>
          </div>
        </div>
        <div className="rightSide">
          <img src="coinBitcoin.png" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>BTCB</div>
            <p>{btcbEnLiquidez ? toFrontEndString(btcbEnLiquidez) : "0"}</p>
          </div>
        </div>
      </div>
      {textoRetirarLiquidez(currentLanguage)}
      <BotonRetirarLiquidez />
    </div>
  );
};

export default RetirarLiquidez;
