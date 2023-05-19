// @ts-nocheck
import React, { useState } from "react";
import { textoLiquidez, textosExtra } from "../../../Utils/textos";
import CuadroProveerLiquidez from "./CuadroProveerLiquidez";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import RetirarLiquidez from "./retirarLiquidez/RetirarLiquidez";

import { vaultBtcbLiquidityOperations } from "../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";
import { amtOperations } from "../../../store/features/amt/amtOperations";

import AlertaAntesDeOperacion from "./alertasLiquidez/AlertaAntesDeOperacion";
import AlertaDepositeTokens from "./alertasLiquidez/AlertaDepositeTokens";
import AlertaRetireTokens from "./alertasLiquidez/AlertaRetireTokens";
import { toFrontEndString } from "../../../Utils/formatHelpers";

interface LiquidezProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}
const Liquidez: React.FC<LiquidezProps> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const balanceLiqAmt = useSelector(
    (state: typeof RootState) => state.liqAmt.balance
  );

  const balanceUserVaultLiq = useSelector(
    (state: typeof RootState) => state.vaultBtcbLiquidity.balanceUserAmt
  );

  const allowanceVault = useSelector(
    (state: typeof RootState) => state.liqAmt.allowanceVaultBtcbLiq
  );
  const balanceUserBtcb = useSelector(
    (state: typeof RootState) => state.vaultBtcbLiquidity.balanceUserBtcb
  );

  const [selectorDarLiq, setSelectorDarLiquidez] = useState(true);

  const [alertaAntes, setAlertaAntes] = useState(false);
  const [alertaDeposite, setAlertaDeposite] = useState(true);

  return (
    <div
      className={
        alertaAntes ||
        (alertaDeposite &&
          balanceLiqAmt &&
          balanceLiqAmt.gt(0) &&
          selectorDarLiq)
          ? "containerSlide"
          : "containerSlide"
      }
    >
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>{textosExtra[currentLanguage].inversiones}</h1>
      </div>
      {textoLiquidez(currentLanguage)}
      {alertaAntes ? <></> : null}
      {selectorDarLiq &&
      balanceLiqAmt &&
      balanceLiqAmt.gt(0) &&
      alertaDeposite ? (
        // Falta depositar liqAmt en baul
        <></>
      ) : null}
      <div className="botonesSimuladorStaking"></div>
      <CuadroProveerLiquidez setAlertaAntes={setAlertaAntes} />
      <div className="containerResultadosSimulacion">
        <h2>{textosExtra[currentLanguage].btcbAcumulados}</h2>
        <p> {balanceUserBtcb ? toFrontEndString(balanceUserBtcb) : ""} BTCB</p>
      </div>
      <RetirarLiquidez />
    </div>
  );
};

export default Liquidez;
