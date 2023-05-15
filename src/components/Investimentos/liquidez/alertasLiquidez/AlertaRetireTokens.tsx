import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ethers, BigNumber } from "ethers";
import { textosExtra } from "../../../../Utils/textos";
import { vaultBtcbLiquidityOperations } from "../../../../store/features/vaultBtcbLiquidity/vaultBtcbLiquidityOperations";

interface AlertaStakingLiquidezProps {
  setAlertaRetire: (value: boolean) => void;
}

const AlertaStakingLiquidez: React.FC<AlertaStakingLiquidezProps> = ({
  setAlertaRetire,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <>
      <div className="cointainerAlertaVault">
        <div className="close1Inch">
          <h2>ALERTA!</h2>
          <img
            className="close"
            onClick={() => setAlertaRetire(false)}
            src="close.png"
          />
        </div>
        <div className="container">
          <p>USTED TIENE DEPOSITADOS SUS TOKENS DE LIQUIDEZ.</p>
          <p>Retirelos del baúl y así podra dejar de proveer liquidez.</p>
        </div>
        <button
          onClick={() => {
            vaultBtcbLiquidityOperations.withdrawl(dispatch);
          }}
        >
          {textosExtra[currentLanguage].retirar}
        </button>
      </div>
    </>
  );
};

export default AlertaStakingLiquidez;
