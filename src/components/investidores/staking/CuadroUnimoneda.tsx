import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

import { CSSTransition } from "react-transition-group";

import { amtOperations } from "../../../store/features/amt/amtOperations";
import { vaultAmtOperations } from "../../../store/features/vaultAmt/vaultAmtOperations";
import { vaultBtcbOperations } from "../../../store/features/vaultBtcb/vaultBtcbOperations";

import BotonOperacionStaking from "./BotonOperacionStaking";

interface CuadroUnimonedaInterface {
  recompra: React.Dispatch<React.SetStateAction<boolean>>;
}

const CuadroUnimoneda = ({}) => {
  console.log("testNewBranchoroc console.log");
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
  const aprobarVaultBtcb = amtOperations.approveVaultBtcb;

  const stake = vaultAmtOperations.stake;

  const inputStake = useRef<HTMLInputElement>(null);

  const [inputStakeValue, setInputStakeValue] = useState("");

  //////////

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>Depositar AMT:</h2>
          <p>Saldo: {balanceAmt}</p>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining.png" />
          <div>USDT</div>
          <input
            ref={inputStake}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={() => {
              setInputStakeValue(inputStake.current?.value);
            }}
          />
        </div>
      </div>

      <div className="containerSaldos">
        <div>
          <h2>AMT depositados:</h2>
          <div>{stackedByUser?.toString()}</div>
        </div>
        <div>
          <h2>Preco do AMT:</h2>
          <div>1AMT = 0.10 USDT</div>
        </div>
      </div>

      <BotonOperacionStaking
        balanceUserAmt={balanceAmt}
        stackedByUser={stackedByUser}
        btcACobrar={btcACobrar}
        allowance={allowance}
        operacionAprobar={aprobarVaultBtcb}
        operacionStake={stake}
        input={inputStakeValue}
      />

      {/* <button className="btnLarge">Comprar AMT</button> */}
    </>
  );
};

export default CuadroUnimoneda;
