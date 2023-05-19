// @ts-nocheck
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";

import {
  textoLiquidez,
  textoRetirarLiquidez,
  textosExtra,
} from "../../../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import BotonRetirarLiquidez from "./BotonRetirarLiquidez";
import { ethers } from "ethers";
import { toFrontEndString } from "../../../../Utils/formatHelpers";
import AlertaRetireTokens from "../../liquidez/alertasLiquidez/AlertaRetireTokens";
import { vaultBtcbLiquidityOperations } from "../../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";
import { masterOperations } from "../../../../store/features/master/masterOperations";

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

  const precioBtcb = ethers.BigNumber.from(28500);

  let usdtEnAmt = ethers.BigNumber.from(0);
  let usdtEnBtcb = ethers.BigNumber.from(0);
  let amtEnLiquidez = ethers.BigNumber.from(0);
  let btcbEnLiquidez = ethers.BigNumber.from(0);
  let poolParticipation = ethers.BigNumber.from(0);
  if (
    balanceLiqAmt &&
    balanceLiqAmtStaked &&
    !balanceLiqAmt.add(balanceLiqAmtStaked).isZero() &&
    liqAmtTotalSupply &&
    balancePoolAmt &&
    balancePoolBtc
  ) {
    poolParticipation = liqAmtTotalSupply.div(
      balanceLiqAmt.add(balanceLiqAmtStaked)
    );
    amtEnLiquidez = balancePoolAmt.div(poolParticipation);
    btcbEnLiquidez = balancePoolBtc.div(poolParticipation);
    usdtEnAmt = amtEnLiquidez.mul(
      balancePoolBtc.mul(precioBtcb).div(balanceLiqAmt.add(balanceLiqAmtStaked))
    );

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
      {balanceUserVaultLiq?.gt(0) ? (
        // Tiene depositados
        <AlertaRetireTokens />
      ) : null}
      <div className="doubleButtonContainer">
        <button
          onClick={() => {
            vaultBtcbLiquidityOperations.withdrawl(dispatch);
          }}
          className={
            balanceLiqAmtStaked
              ? balanceLiqAmtStaked.gt(0)
                ? undefined
                : "gris"
              : undefined
          }
        >
          {/* {textosExtra[currentLanguage].retirar} */} RETIRAR STAKING
        </button>
        <button
          className={
            balanceLiqAmt
              ? balanceLiqAmt.gt(0)
                ? undefined
                : "gris"
              : undefined
          }
          onClick={() =>
            balanceLiqAmt && balanceLiqAmt.gt(0)
              ? masterOperations.removeLiquidity(dispatch, balanceLiqAmt)
              : null
          }
        >
          Retirar liquidez
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
