// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import BotonOperacionStaking from "./BotonOperacionStaking";
import { textoAtencionStaking, textosExtra } from "../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface BotonOperacionProps {
  balanceUserAmt: number | undefined;
  stackedByUser: number | undefined;
  btcACobrar: number | undefined;
  allowance: number | undefined;
  operacionAprobar: Function;
  operacionStake: Function;
  operacionWithdrawl: Function;
}

const CuadroStaking: React.FC<BotonOperacionProps> = ({
  balanceUserAmt,
  stackedByUser,
  btcACobrar,
  allowance,
  operacionAprobar,
  operacionStake,
  operacionWithdrawl,
}) => {
  const inputStake = useRef<HTMLInputElement>(null);

  const [inputStakeValue, setInputStakeValue] = useState("");
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  //////////

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>{textosExtra[currentLanguage].depositarAmt}</h2>
          <p>
            {textosExtra[currentLanguage].saldo}{" "}
            {Number(balanceUserAmt?.toFixed(5))}
          </p>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining.png" />
          <div>AMT</div>
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

      {btcACobrar == undefined ? null : textoAtencionStaking(currentLanguage)}

      <BotonOperacionStaking
        stackedByUser={stackedByUser}
        operacionWithdrawl={operacionWithdrawl}
        balanceUserAmt={balanceUserAmt}
        allowance={allowance}
        operacionAprobar={operacionAprobar}
        operacionStake={operacionStake}
        input={inputStakeValue}
      />
      <div className="containerPasos">
        <img
          src="number-one.png"
          alt=""
          className={
            stackedByUser > 0 ? "activeIcon pasos" : "inactiveIcon pasos"
          }
        />
        <img src="right-arrow.png" alt="" className="inactiveIcon pasos" />
        <img
          src="number-two.png"
          alt=""
          className={
            stackedByUser > 0 ? "inactiveIcon pasos" : "activeIcon pasos"
          }
        />
      </div>

      <div className="rendimientosStakingContainer">
        Meu investimento atual:
        <div className="investimentoActual">
          <div>
            <div>
              {btcACobrar >= 0
                ? textosExtra[currentLanguage].btcbAcumulados
                : textosExtra[currentLanguage].amtGenerados}
            </div>
            <div>{btcACobrar}</div>
          </div>
          <div>
            <div>{textosExtra[currentLanguage].amtDepositados}</div>
            <div>{Number(stackedByUser?.toFixed(4))}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CuadroStaking;
