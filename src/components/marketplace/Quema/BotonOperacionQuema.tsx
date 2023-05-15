import React from "react";
import { AppDispatch } from "../../../store/store";
import { textosExtra } from "../../../Utils/textos";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";
import { RootState } from "../../../store/store";

interface BotonOperacionQuemaProps {
  balanceAmt: BigNumber | undefined;
  balanceBtcb: BigNumber | undefined;
  allowanceAmt: BigNumber | undefined;
  backRate: number | undefined;
  approveMarket: Function;
  burn: Function;
  input: string;
}

const BotonOperacionQuema: React.FC<BotonOperacionQuemaProps> = ({
  balanceAmt,
  balanceBtcb,
  allowanceAmt,
  backRate,
  approveMarket,
  burn,
  input,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const mesajeBoton = () => {
    if (allowanceAmt && allowanceAmt.lt(ethers.utils.parseEther(input))) {
      return textosExtra[currentLanguage].aprobar;
    }
    if (balanceAmt && balanceAmt.lt(ethers.utils.parseEther(input))) {
      return textosExtra[currentLanguage].bceInsuf;
    } else {
      return textosExtra[currentLanguage].quemar;
    }
  };

  return (
    <button
      onClick={() => {
        allowanceAmt?.gt(parseFloat(input))
          ? burn(dispatch, ethers.utils.parseEther(input))
          : approveMarket(dispatch);
      }}
      className="btnLarge quema"
    >
      {input != "" && balanceAmt
        ? mesajeBoton()
        : textosExtra[currentLanguage].quemar}
    </button>
  );
};

export default BotonOperacionQuema;
