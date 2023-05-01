import React, { useState } from "react";
import CuadroStaking from "../CuadroStaking";
import { textoStakingAmt } from "../../../Utils/textos";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { amtOperations } from "../../../store/features/amt/amtOperations";
import { vaultAmtOperations } from "../../../store/features/vaultAmt/vaultAmtOperations";
import { CSSTransition } from "react-transition-group";
import HistoricoStakingAmt from "./HistoricoStakingAmt";

interface StakingAmtInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const StakingAmt: React.FC<StakingAmtInterface> = ({ setActivePage }) => {
  const [historico, setHistorico] = useState(false);
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
  const operacionWithdrawl = vaultAmtOperations.withdrawl;

  const contractAmt = useSelector(
    (state: typeof RootState) => state.amt.contract
  );
  const currentSnapshot = useSelector(
    (state: typeof RootState) => state.amt.currentSnapshot
  );

  return (
    <>
      <div className="containerSlide">
        <div className="navBar_top">
          <img onClick={() => setActivePage("")} src="icon_nav.png" />
          <h1>Investimentos</h1>
        </div>
        {textoStakingAmt("por")}
        <CuadroStaking
          operacionWithdrawl={operacionWithdrawl}
          balanceUserAmt={balanceAmt}
          stackedByUser={stackedByUser}
          btcACobrar={undefined}
          allowance={allowance}
          operacionAprobar={aprobarVault}
          operacionStake={stake}
        />

        <div className="doubleButtonContainer">
          <button
            onClick={() => {
              setHistorico(true);
            }}
            className="btnTransp"
          >
            Consultar historico
          </button>
          <button
            onClick={() => {
              operacionWithdrawl(dispatch);
            }}
            className=""
          >
            Sacar
          </button>
        </div>
      </div>

      <CSSTransition
        in={historico == true}
        timeout={800}
        classNames="slideIzquierda"
        unmountOnExit
      >
        <HistoricoStakingAmt
          setHistorico={setHistorico}
          stackedByUser={stackedByUser}
          contractAmt={contractAmt}
          currentSnapshot={currentSnapshot}
        />
      </CSSTransition>
    </>
  );
};

export default StakingAmt;
