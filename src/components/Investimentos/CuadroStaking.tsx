import React, { useEffect, useRef, useState } from "react";
import BotonOperacionStaking from "./BotonOperacionStaking";
import { textoAtencionStaking, textosExtra } from "../../Utils/textos";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchVaultAmt } from "../../Utils/fetchBuckets";
import { BigNumber, ethers } from "ethers";
import {
  toFrontEndString,
  toFrontEndStringForSmallInvestor,
} from "../../Utils/formatHelpers";
import { dataStakingType } from "../../Utils/fetchBuckets";
import { setGeneratedAmtWaitingForUpdate } from "../../store/features/vaultAmt/vaultAmtSlice";
import { useDispatch } from "react-redux";
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

  const dataTrigger = useSelector(
    (state: typeof RootState) => state.vaultAmt.getNewDataTrigger
  );
  const amtGeneratedWaitingForUpdate = useSelector(
    (state: typeof RootState) => state.vaultAmt.amtGeneratedWaitingForUpdate
  );
  const dispatch = useDispatch<AppDispatch>();

  const [stakingIniciales, setStakingIniciales] = useState<
    dataStakingType | undefined
  >(undefined);

  useEffect(() => {
    console.log("fetching new data");
    setStakingIniciales(undefined);
    fetchVaultAmt().then((result: any) => {
      console.log({ result });
      if (addr) {
        console.log(result.dataStakings[addr]);
      }
      setStakingIniciales(result.dataStakings);

      console.log({ stakingIniciales });
      dispatch(setGeneratedAmtWaitingForUpdate(false));
    });
  }, [dataTrigger]);
  const precition = stackedByUser
    ? stackedByUser.lt(ethers.utils.parseEther("300"))
      ? 10
      : 5
    : 5;
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
              if (
                inputStake.current &&
                parseFloat(inputStake.current?.value) >= 0
              ) {
                setInputStakeValue(
                  inputStake.current?.value ? inputStake.current?.value : ""
                );
              } else if (inputStake.current) {
                inputStake.current.value = "0";
              }
            }}
          />
        </div>

        <div className="boton100porcent">
          <button
            onClick={() => {
              if (inputStake.current && balanceUserAmt) {
                inputStake.current.value =
                  ethers.utils.formatEther(balanceUserAmt);
                setInputStakeValue(ethers.utils.formatEther(balanceUserAmt));

                /* inputStake.current.value = toFrontEndString(balanceUserAmt, 15);
                setInputStakeValue(toFrontEndString(balanceUserAmt, 15)); */
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
                {btcACobrar != undefined && btcACobrar.gte(0)
                  ? toFrontEndStringForSmallInvestor(btcACobrar, precition)
                  : addr &&
                    stackedByUser &&
                    stakingIniciales != undefined &&
                    stackedByUser.gt(0) &&
                    !amtGeneratedWaitingForUpdate
                  ? toFrontEndString(
                      stackedByUser.sub(
                        ethers.BigNumber.from(stakingIniciales[addr].amount)
                      )
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
