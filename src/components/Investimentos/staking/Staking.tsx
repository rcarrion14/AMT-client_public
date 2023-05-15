import React, { useState } from "react";
import CuadroStaking from "../CuadroStaking";
import { textoStaking, textosExtra } from "../../../Utils/textos";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { amtOperations } from "../../../store/features/amt/amtOperations";
import { vaultBtcbOperations } from "../../../store/features/vaultBtcb/vaultBtcbOperations";
import HistoricoStaking from "./HistoricoStaking";
import { CSSTransition } from "react-transition-group";

interface AmtStaking {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Staking: React.FC<AmtStaking> = ({ setActivePage }) => {
  const [historico, setHistorico] = useState(false);
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const contractAmt = useSelector(
    (state: typeof RootState) => state.amt.contract
  );
  const currentSnapshot = useSelector(
    (state: typeof RootState) => state.amt.currentSnapshot
  );

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
  const operacionWithdrawl = vaultBtcbOperations.withdrawl;

  return (
    <>
      <div className="containerSlide">
        <div className="navBar_top">
          <img onClick={() => setActivePage("")} src="icon_nav.png" />
          <h1>{textosExtra[currentLanguage].inversiones}</h1>
        </div>

        {textoStaking(currentLanguage)}

        <CuadroStaking
          operacionWithdrawl={operacionWithdrawl}
          balanceUserAmt={balanceAmt}
          stackedByUser={stackedByUser}
          btcACobrar={btcACobrar}
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
            {textosExtra[currentLanguage].consultarHistorico}
          </button>
          <button
            onClick={() => {
              operacionWithdrawl(dispatch);
            }}
            className={
              stackedByUser && stackedByUser.gt(0) ? undefined : "gris"
            }
          >
            {textosExtra[currentLanguage].retirar}
          </button>
        </div>
      </div>
      <CSSTransition
        in={historico == true}
        timeout={800}
        classNames="slideIzquierda"
        unmountOnExit
      >
        <HistoricoStaking
          setHistorico={setHistorico}
          stackedByUser={stackedByUser}
          contractAmt={contractAmt}
          currentSnapshot={currentSnapshot}
        />
      </CSSTransition>
    </>
  );
};

export default Staking;
