// @ts-nocheck
import React, { useState } from "react";
import { textoLiquidez, textosExtra } from "../../../Utils/textos";
import CuadroProveerLiquidez from "./CuadroProveerLiquidez";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { current } from "@reduxjs/toolkit";
import RetirarLiquidez from "./retirarLiquidez/RetirarLiquidez";
import AlertaStakingLiquidez from "./AlertaStakingLiquidez";
import { vaultBtcbLiquidityOperations } from "../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";
import { amtOperations } from "../../../store/features/amt/amtOperations";
import AlertaAlDepositar from "./AlertaAlDepositar";

interface LiquidezInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Liquidez: React.FC<LiquidezInterface> = ({ setActivePage }) => {
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
    (state: typeof RootState) => state.amt.allowanceVaultBtcbLiq
  );

  const approveVault = amtOperations.approveVaultBtcbLiq;
  const stake = vaultBtcbLiquidityOperations.stake;
  const withdrawl = vaultBtcbLiquidityOperations.withdrawl;

  const [selectorDarLiq, setSelectorDarLiquidez] = useState(true);
  const [alertaVault, setAlertaVault] = useState(true);
  const [alertaAlDepositar, setAlertaAlDepositar] = useState(false);

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>{textosExtra[currentLanguage].inversiones}</h1>
      </div>
      {textoLiquidez(currentLanguage)}
      {alertaAlDepositar ? (
        <AlertaAlDepositar
          setAlertaAlDepositar={setAlertaAlDepositar}
          balanceLiqAmt={balanceLiqAmt}
          operation={stake}
          approveVault={approveVault}
          allowanceVault={allowanceVault}
        />
      ) : null}
      {selectorDarLiq && balanceLiqAmt > 0 && alertaVault ? (
        // Falta depositar liqAmt en baul
        <AlertaStakingLiquidez
          faltaDepEnBaul={true}
          setAlertaVault={setAlertaVault}
          operation={stake}
          balanceLiqAmt={balanceLiqAmt}
          approveVault={approveVault}
          allowanceVault={allowanceVault}
        />
      ) : null}

      {!selectorDarLiq && balanceUserVaultLiq && alertaVault > 0 ? (
        // Tiene depositados
        <AlertaStakingLiquidez
          faltaDepEnBaul={false}
          setAlertaVault={setAlertaVault}
          operation={withdrawl}
        />
      ) : null}

      <div className="botonesSimuladorStaking">
        <button
          onClick={() => {
            setSelectorDarLiquidez(true);
            setAlertaVault(true);
          }}
          className={selectorDarLiq ? "active" : undefined}
        >
          {textosExtra[currentLanguage].proveerLiquidez}
        </button>
        <button
          onClick={() => {
            setSelectorDarLiquidez(false);
            setAlertaVault(true);
          }}
          className={selectorDarLiq ? undefined : "active"}
        >
          {textosExtra[currentLanguage].tuLiquidezYRetirar}
        </button>
      </div>
      {selectorDarLiq ? (
        <CuadroProveerLiquidez setAlertaAlDepositar={setAlertaAlDepositar} />
      ) : (
        <RetirarLiquidez />
      )}
    </div>
  );
};

export default Liquidez;
