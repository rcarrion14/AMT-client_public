import React from "react";
import CuadroUnimoneda from "../CuadroUnimoneda";
import { textoStakingAmt } from "../../../textos";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { amtOperations } from "../../../store/features/amt/amtOperations";
import { vaultAmtOperations } from "../../../store/features/vaultAmt/vaultAmtOperations";

interface StakingAmtInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const StakingAmt: React.FC<StakingAmtInterface> = ({ setActivePage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );
  const stackedByUser = useSelector(
    (state: typeof RootState) => state.vaultAmt.balanceUserAmt
  );

  const allowance = useSelector(
    (state: typeof RootState) => state.amt.allowanceVaultAmt
  );
  const aprobarVault = amtOperations.approveVaultAmt;

  const stake = vaultAmtOperations.stake;

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Investimentos</h1>
      </div>
      {textoStakingAmt("por")}
      <CuadroUnimoneda
        balanceUserAmt={balanceAmt}
        stackedByUser={stackedByUser}
        btcACobrar={undefined}
        allowance={allowance}
        operacionAprobar={aprobarVault}
        operacionStake={stake}
      />
    </div>
  );
};

export default StakingAmt;
