// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import BotonOperacionStaking from "./BotonOperacionStaking";
import { textoAtencionStaking, textosExtra } from "../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchVaultAmt } from "../../Utils/fetchBuckets";
import { ethers } from "ethers";
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
            {balanceUserAmt ? ethers.utils.formatEther(balanceUserAmt) : "-"}
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
                {btcACobrar != undefined
                  ? textosExtra[currentLanguage].btcbAcumulados
                  : textosExtra[currentLanguage].amtGenerados}
              </h2>
              <div>
                {btcACobrar != undefined
                  ? ethers.utils.formatEther(btcACobrar)
                  : stakingIniciales != undefined
                  ? ethers.utils.formatEther(
                      stackedByUser.sub(stakingIniciales[addr].amount)
                    )
                  : "-"}
              </div>
            </div>
            <div>
              <h2>{textosExtra[currentLanguage].amtDepositados}</h2>
              <div>
                {stackedByUser ? ethers.utils.formatEther(stackedByUser) : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CuadroStaking;
