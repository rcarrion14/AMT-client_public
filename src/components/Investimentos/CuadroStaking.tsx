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
            {textosExtra[currentLanguage].saldo} {balanceUserAmt}
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
            <div>{stackedByUser}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CuadroStaking;

/*

endpoint = "https://api.bscscan.com/api"

blocks = "?module=logs&action=getLogs&fromBlock=4993830&toBlock=27745094"

addr = "&address=" + "0x6Ae0A238a6f51Df8eEe084B1756A54dD8a8E85d3" 

topic0 = "&topic0" + "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

topic2 = "&topic2" + "0x00000000000000000000000084a8cd271cf9ba2119027791d342fc47a125c2d6"

api = "&apikey=" + "JW3HDZAW5Q2WUYKSU8WITXPHE9NFQC48ME"

//https://api.bscscan.com/api
?module=logs
&action=getLogs
&fromBlock=4993830
&toBlock=27745094

&address=0xe561479bebee0e606c19bb1973fc4761613e3c42
&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
&topic0_1_opr=and
&topic1=0x000000000000000000000000730e2065b9daee84c3003c05bf6d2b3a08e55667
&apikey=YourApiKeyToken 






*/
