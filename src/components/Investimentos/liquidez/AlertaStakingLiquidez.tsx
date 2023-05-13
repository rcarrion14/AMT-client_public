import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { ethers, BigNumber } from "ethers";
interface AlertaStakingLiquidezProps {
  faltaDepEnBaul: boolean;
  setAlertaVault: (value: boolean) => void;
  operation: (value?: BigNumber) => void;
  balanceLiqAmt: BigNumber;
  approveVault: () => void;
  allowanceVault: BigNumber;
}

const AlertaStakingLiquidez: React.FC<AlertaStakingLiquidezProps> = ({
  faltaDepEnBaul,
  setAlertaVault,
  operation,
  balanceLiqAmt,
  approveVault,
  allowanceVault,
}) => {
  return (
    <>
      <div className="cointainerAlertaVault">
        <div className="close1Inch">
          <h2>ALERTA!</h2>
          <img
            className="close"
            onClick={() => setAlertaVault(false)}
            src="close.png"
          />
        </div>
        <div className="container">
          {faltaDepEnBaul ? (
            <>
              <p>USTED NO DEPOSITO SUS TOKENS EN BAUL</p>
              <p>Depositelos asi cobrara su liquidez</p>
            </>
          ) : (
            <>
              <p>USTED TIENE DEPOSITADOS SUS TOKENS DE LIQUIDEZ.</p>
              <p>Retirelos del baúl y así podra dejar de proveer liquidez.</p>
            </>
          )}
        </div>
        <button
          onClick={() => {
            faltaDepEnBaul
              ? allowanceVault > balanceLiqAmt
                ? operation(ethers.utils.parseEther(balanceLiqAmt))
                : approveVault()
              : operation(); //RETIRA
          }}
        >
          {
            faltaDepEnBaul
              ? allowanceVault > balanceLiqAmt
                ? "Deposite"
                : "Apruebe"
              : "Retire" //RETIRA
          }
        </button>
      </div>
    </>
  );
};

export default AlertaStakingLiquidez;
