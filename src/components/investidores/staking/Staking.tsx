import React from "react";
import CuadroUnimoneda from "../CuadroUnimoneda";
import { textoStaking, textoInfoAllowance } from "../../../textos";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { amtOperations } from "../../../store/features/amt/amtOperations";
import { vaultBtcbOperations } from "../../../store/features/vaultBtcb/vaultBtcbOperations";

interface AmtStaking {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Staking: React.FC<AmtStaking> = ({ setActivePage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );
  const stackedByUser = useSelector(
    (state: typeof RootState) => state.vaultBtcb.balanceUserAmt
  );
  const btcACobrar = useSelector(
    (state: typeof RootState) => state.vaultBtcb.balanceUserBtcb
  );
  const allowance = useSelector(
    (state: typeof RootState) => state.amt.allowanceVaultBtcb
  );
  const aprobarVault = amtOperations.approveVaultBtcb;

  const stake = vaultBtcbOperations.stake;

  const infoAllowance = textoInfoAllowance("por");
  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>

      {textoStaking("por")}

      <CuadroUnimoneda
        balanceUserAmt={balanceAmt}
        stackedByUser={stackedByUser}
        btcACobrar={btcACobrar}
        allowance={allowance}
        operacionAprobar={aprobarVault}
        operacionStake={stake}
      />

      <button className="btnTransp"> Consultar historico</button>
    </div>
  );
};

export default Staking;
