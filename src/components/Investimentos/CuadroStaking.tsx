import React, { useEffect, useRef, useState } from "react";
import BotonOperacionStaking from "./BotonOperacionStaking";
import { textoAtencionStaking, textosExtra } from "../../Utils/textos";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchVaultAmt } from "../../Utils/fetchBuckets";
import { ethers, BigNumber } from "ethers";
import { toFrontEndString } from "../../Utils/formatHelpers";
import { dataStakingType } from "../../Utils/fetchBuckets";
interface CuadroStakingProps {
  balanceUserAmt: BigNumber | undefined;
  stackedByUser: BigNumber | undefined;
  btcACobrar: BigNumber | undefined;
  allowance: BigNumber | undefined;
  operacionAprobar: Function;
  operacionStake: Function;
  operacionWithdrawl: Function;
}

const CuadroStaking: React.FC<CuadroStakingProps> = ({
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
  const [stakingIniciales, setStakingIniciales] = useState<
    dataStakingType | undefined
  >(undefined);

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
            {balanceUserAmt ? toFrontEndString(balanceUserAmt) : "-"}
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
              setInputStakeValue(
                inputStake.current?.value ? inputStake.current?.value : ""
              );
            }}
          />
        </div>

        <div className="boton100porcent">
          <button
            onClick={() => {
              if (inputStake.current && balanceUserAmt) {
                inputStake.current.value = toFrontEndString(balanceUserAmt, 15);
                setInputStakeValue(toFrontEndString(balanceUserAmt, 15));
              }
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
            stackedByUser && stackedByUser.gt(0)
              ? "activeIcon pasos"
              : "inactiveIcon pasos"
          }
        />
        <img src="right-arrow.png" alt="" className="inactiveIcon pasos" />
        <img
          src="number-two.png"
          alt=""
          className={
            stackedByUser && stackedByUser.gt(0)
              ? "inactiveIcon pasos"
              : "activeIcon pasos"
          }
        />
      </div>

      <div className="rendimientosStakingContainer">
        {textosExtra[currentLanguage].investimentoActual + ":"}
        <div>
          <div className="containerSaldos">
            <div>
              <h2>
                {btcACobrar != undefined
                  ? textosExtra[currentLanguage].btcbAcumulados
                  : textosExtra[currentLanguage].amtGenerados}
              </h2>
              <div>
                {btcACobrar != undefined && btcACobrar.gt(0)
                  ? toFrontEndString(btcACobrar)
                  : addr &&
                    stackedByUser &&
                    stakingIniciales != undefined &&
                    stackedByUser.gt(0)
                  ? toFrontEndString(
                      stackedByUser.sub(stakingIniciales[addr].amount)
                    )
                  : "-"}
              </div>
            </div>
            <div>
              <h2>{textosExtra[currentLanguage].amtDepositados}</h2>
              <div>{stackedByUser ? toFrontEndString(stackedByUser) : "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CuadroStaking;
