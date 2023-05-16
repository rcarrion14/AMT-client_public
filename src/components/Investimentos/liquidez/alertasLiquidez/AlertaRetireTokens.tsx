import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";

import { ethers, BigNumber } from "ethers";
import { textosExtra } from "../../../../Utils/textos";

interface AlertaStakingLiquidezProps {
  setAlertaRetire: (value: boolean) => void;
}

const AlertaStakingLiquidez: React.FC<AlertaStakingLiquidezProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  return (
    <div>
      <div className="container">
        <p>USTED TIENE DEPOSITADOS SUS TOKENS DE LIQUIDEZ.</p>
        <p>Retirelos del baúl y así podra dejar de proveer liquidez.</p>
      </div>
    </div>
  );
};

export default AlertaStakingLiquidez;
