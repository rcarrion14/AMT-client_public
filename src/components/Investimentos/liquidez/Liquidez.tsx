import React, { useState } from "react";
import { textoLiquidez, textosExtra } from "../../../Utils/textos";
import CuadroProveerLiquidez from "./CuadroProveerLiquidez";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import RetirarLiquidez from "./retirarLiquidez/RetirarLiquidez";
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
      <div className="botonesSimuladorStaking"></div>
      <CuadroProveerLiquidez />
      <div className="containerResultadosSimulacion">
        <div style={{ alignContent: "center" }}>
          <h2>{textosExtra[currentLanguage].btcbAcumulados}</h2>
          <p>{balanceUserBtcb ? toFrontEndString(balanceUserBtcb) : ""} BTCB</p>
        </div>
      </div>
      <RetirarLiquidez />
    </div>
  );
};

export default Liquidez;
