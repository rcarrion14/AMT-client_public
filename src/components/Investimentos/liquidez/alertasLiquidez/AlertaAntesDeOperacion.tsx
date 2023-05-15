// @ts-nocheck
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ethers } from "ethers";
import Spinner from "../../../Generales/Spinner/Spinner";
import { amtOperations } from "../../../../store/features/amt/amtOperations";
import { vaultBtcbLiquidityOperations } from "../../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";

const AlertaStakingLiquidez = ({
  setAlertaAntes,
  balanceLiqAmt,
  allowanceVault,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const mensajeBoton = () => {
    if (allowanceVault.lt(balanceLiqAmt)) {
      return textosExtra[currentLanguage].aprobar;
    } else {
      return textosExtra[currentLanguage].stake;
    }
  };

  return (
    <>
      <div className="cointainerAlertaVault">
        <div className="close1Inch">
          <h2>ALERTA!</h2>
          <img
            className="close"
            onClick={() => setAlertaAntes(false)}
            src="close.png"
          />
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
                ? amtOperations.approveVaultBtcbLiq(dispatch)
                : vaultBtcbLiquidityOperations.stake(dispatch, balanceLiqAmt);
            }}
          >
            {balanceLiqAmt ? mensajeBoton() : "Stake"}
          </button>
        )}
      </div>
    </>
  );
};

export default AlertaStakingLiquidez;
