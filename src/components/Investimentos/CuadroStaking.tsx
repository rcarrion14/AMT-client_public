// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import BotonOperacionStaking from "./BotonOperacionStaking";
import { textoAtencionStaking, textosExtra } from "../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchVaultAmt } from "../../Utils/fetchBuckets";
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
  const addr = useSelector((state: typeof RootState) => state.wallet.address);
  const inputStake = useRef<HTMLInputElement>(null);
  const [inputStakeValue, setInputStakeValue] = useState("");
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const [stakingIniciales, setStakingIniciales] = useState(undefined);

  useEffect(() => {
    fetchVaultAmt().then((result) => {
      setStakingIniciales(result.dataStakings);
    });
  }, []);

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

        <div className="boton100porcent">
          <button
            onClick={() => {
              setInputStakeValue(balanceUserAmt);
              inputStake.current.value = balanceUserAmt;
            }}
            className="btnSimulacion transparente"
          >
            100%
          </button>
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
        <div>
          <div className="containerSaldos">
            <div>
              <h2>
                {btcACobrar >= 0
                  ? textosExtra[currentLanguage].btcbAcumulados
                  : textosExtra[currentLanguage].amtGenerados}
              </h2>
              <div>
                {btcACobrar >= 0
                  ? btcACobrar
                  : stakingIniciales == undefined
                  ? "-"
                  : Number(
                      (stackedByUser - stakingIniciales[addr].amount).toFixed(1)
                    )}
              </div>
            </div>
            <div>
              <h2>{textosExtra[currentLanguage].amtDepositados}</h2>
              <div>{Number(stackedByUser?.toFixed(4))}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CuadroStaking;
