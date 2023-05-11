// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { ethers } from "ethers";
import Spinner from "../../Generales/Spinner/Spinner";

const AlertaStakingLiquidez = ({
  setAlertaAlDepositar,
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
          {/*           <img
            className="close"
            onClick={() => setAlertaAlDepositar(false)}
            src="close.png"
          /> */}
        </div>
        <div className="container">
          <p>PARA COBRAR POR LOS TOKENS EN LIQ DEBE DEPOSITAR EN EL BAUL</p>
          <p>Depositelos una vez se confirme la transaccion</p>
        </div>

        {balanceLiqAmt == 0 ? (
          <Spinner />
        ) : (
          <button
            onClick={() => {
              allowanceVault.lt(balanceLiqAmt)
                ? approveVault()
                : operation(ethers.utils.parseEther(balanceLiqAmt));
            }}
          ></button>
        )}
      </div>
    </>
  );
};

export default AlertaStakingLiquidez;
