import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ethers, BigNumber } from "ethers";
import { textosExtra } from "../../../../Utils/textos";
import { vaultBtcbLiquidityOperations } from "../../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";
import { amtOperations } from "../../../../store/features/amt/amtOperations";

interface AlertaStakingLiquidezProps {
  setAlertaDeposite: (value: boolean) => void;
  balanceLiqAmt: BigNumber;
  allowanceVault: BigNumber;
}

const AlertaStakingLiquidez: React.FC<AlertaStakingLiquidezProps> = ({
  setAlertaDeposite,
  balanceLiqAmt,
  allowanceVault,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

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
            onClick={() => setAlertaDeposite(false)}
            src="close.png"
          />
        </div>
        <div className="container">
          <p>USTED NO DEPOSITO SUS TOKENS EN BAUL</p>
          <p>Depositelos asi cobrara su liquidez</p>
        </div>
        <button
          onClick={() => {
            allowanceVault.gt(balanceLiqAmt)
              ? vaultBtcbLiquidityOperations.stake(dispatch, balanceLiqAmt)
              : amtOperations.approveVaultBtcbLiq(dispatch);
          }}
        >
          {balanceLiqAmt ? mensajeBoton() : "Stake"}
        </button>
      </div>
    </>
  );
};

export default AlertaStakingLiquidez;
