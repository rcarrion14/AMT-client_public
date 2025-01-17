import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";

import { textoRetirarLiquidez, textosExtra } from "../../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ethers } from "ethers";
import { toFrontEndString } from "../../../../Utils/formatHelpers";
import { vaultBtcbLiquidityOperations } from "../../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";
import { masterOperations } from "../../../../store/features/master/masterOperations";
import { liqAmtOperations } from "../../../../store/features/liqAmt/liqAmtOperations";
const RetirarLiquidez: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const balanceLiqAmt = useSelector(
    (state: typeof RootState) => state.liqAmt.balance
  );

  const balanceLiqAmtStaked = useSelector(
    (state: typeof RootState) => state.vaultBtcbLiquidity.balanceUserAmt
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
  const balanceUserVaultLiq = useSelector(
    (state: typeof RootState) => state.vaultBtcbLiquidity.balanceUserAmt
  );

  const allowanceLiqAmtToMaster = useSelector(
    (state: typeof RootState) => state.liqAmt.allowanceMaster
  );

  const precioBtcb = ethers.BigNumber.from(28500);

  let usdtEnAmt = ethers.BigNumber.from(0);
  let usdtEnBtcb = ethers.BigNumber.from(0);
  let amtEnLiquidez = ethers.BigNumber.from(0);
  let btcbEnLiquidez = ethers.BigNumber.from(0);
  let poolParticipation = "";
  if (
    balanceLiqAmt &&
    balanceLiqAmtStaked &&
    !balanceLiqAmt.add(balanceLiqAmtStaked).isZero() &&
    liqAmtTotalSupply &&
    balancePoolAmt &&
    balancePoolBtc
  ) {
    poolParticipation = (
      (parseFloat(balanceLiqAmtStaked.toString()) /
        parseFloat(liqAmtTotalSupply.toString())) *
      100
    ).toFixed(2);

    /*     amtEnLiquidez = balancePoolAmt
      .mul(balanceLiqAmtStaked)
      .div(liqAmtTotalSupply);
    btcbEnLiquidez = balancePoolBtc
      .mul(balanceLiqAmtStaked)
      .div(liqAmtTotalSupply); */
    amtEnLiquidez = balancePoolAmt.mul(balanceLiqAmt).div(liqAmtTotalSupply);
    btcbEnLiquidez = balancePoolBtc.mul(balanceLiqAmt).div(liqAmtTotalSupply);
    usdtEnAmt = amtEnLiquidez.mul(
      balancePoolBtc.mul(precioBtcb).div(balanceLiqAmt.add(balanceLiqAmtStaked))
    );

    usdtEnAmt = amtEnLiquidez
      .mul(balancePoolBtc)
      .mul(precioBtcb)
      .div(balancePoolAmt);

    usdtEnBtcb = btcbEnLiquidez.mul(precioBtcb);
  }

  const mensajeBotonRetirarLiquidezYStake = () => {
    return balanceLiqAmtStaked && balanceLiqAmtStaked.gt(0)
      ? textosExtra[currentLanguage].retirarStaking
      : allowanceLiqAmtToMaster &&
        balanceLiqAmt &&
        allowanceLiqAmtToMaster.lt(balanceLiqAmt)
      ? textosExtra[currentLanguage].aprobar
      : textosExtra[currentLanguage].retirarLiquidez;
  };

  const operacionBotonRetirarLiquidezYStake = () => {
    console.log("dsas");
    return balanceLiqAmtStaked && balanceLiqAmtStaked.gt(0)
      ? vaultBtcbLiquidityOperations.withdrawl(dispatch)
      : allowanceLiqAmtToMaster &&
        balanceLiqAmt &&
        allowanceLiqAmtToMaster.lt(balanceLiqAmt)
      ? liqAmtOperations.approveMaster(dispatch)
      : balanceLiqAmt
      ? masterOperations.removeLiquidity(dispatch, balanceLiqAmt)
      : undefined;
  };

  return (
    <div className="containerSlideRetirarLiquidez">
      <div style={{ display: "flex", textAlign: "center" }}>
        <h1>Saldo total: </h1>
        <h3>{toFrontEndString(usdtEnAmt.add(usdtEnBtcb))}$</h3>
      </div>
      <div className="containerParticipacionEnPool">
        <b>{textosExtra[currentLanguage].participacionEnPool} </b>
        {poolParticipation.toString()}%
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
      <div className="textoConexion">
        <button
          className={
            (balanceLiqAmt && balanceLiqAmt.gt(0)) ||
            (balanceLiqAmtStaked && balanceLiqAmtStaked.gt(0))
              ? undefined
              : "gris"
          }
          onClick={operacionBotonRetirarLiquidezYStake}
        >
          {mensajeBotonRetirarLiquidezYStake()}
        </button>
      </div>
      <div className="containerPasos">
        <img
          className={
            balanceLiqAmtStaked && balanceLiqAmtStaked.gt(0)
              ? "activeIcon pasos"
              : "inactiveIcon pasos"
          }
          src="number-one.png"
          alt=""
        />
        <img src="right-arrow.png" alt="" className="inactiveIcon pasos" />
        <img
          src="number-two.png"
          alt=""
          className={
            balanceLiqAmt && balanceLiqAmt.gt(0)
              ? "activeIcon pasos"
              : "inactiveIcon pasos"
          }
        />
      </div>
    </div>
  );
};

export default RetirarLiquidez;
