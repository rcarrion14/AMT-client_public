import React, { useEffect, useRef, useState } from "react";
import BotonOperacionStaking from "./BotonOperacionStaking";
import { textosExtra } from "../../Utils/textos";

interface BotonOperacionProps {
  balanceUserAmt: number | undefined;
  stackedByUser: number | undefined;
  btcACobrar: number | undefined;
  allowance: number | undefined;
  operacionAprobar: Function;
  operacionStake: Function;
}

const CuadroStaking: React.FC<BotonOperacionProps> = ({
  balanceUserAmt,
  stackedByUser,
  btcACobrar,
  allowance,
  operacionAprobar,
  operacionStake,
}) => {
  const inputStake = useRef<HTMLInputElement>(null);

  const [inputStakeValue, setInputStakeValue] = useState("");

  //////////

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>{textosExtra.por.depositarAmt}</h2>
          <p>
            {textosExtra.por.saldo} {balanceUserAmt}
          </p>
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
          <h2>{textosExtra.por.amtDepositados}</h2>
          <div>{stackedByUser?.toString()}</div>
        </div>
        <div>
          <h2>{textosExtra.por.precioAmt}</h2>
          <div>1AMT = 0.10 USDT</div>
        </div>
      </div>

      <BotonOperacionStaking
        balanceUserAmt={balanceUserAmt}
        allowance={allowance}
        operacionAprobar={operacionAprobar}
        operacionStake={operacionStake}
        input={inputStakeValue}
      />
    </>
  );
};

export default CuadroStaking;
