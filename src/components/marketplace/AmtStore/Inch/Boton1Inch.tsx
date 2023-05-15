import React from "react";
import { AppDispatch } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { textosExtra } from "../../../../Utils/textos";
import { ethers, BigNumber } from "ethers";
import { operationExecution } from "../../../../store/features/operationExecution";
import { TransactionDataInterface } from "./CuadroInterfaz1Inch";
interface Boton1InchProps {
  balanceUsdt: BigNumber | undefined;
  balanceErc20: BigNumber | undefined;
  allowanceErc20: BigNumber | undefined;
  txData: TransactionDataInterface | undefined;
  input: string;
  signer: any;
  approveErc20: any;
  toggler: any;
  setToggler: any;
}
const Boton1Inch: React.FC<Boton1InchProps> = ({
  balanceUsdt,
  balanceErc20,
  allowanceErc20,
  txData,
  input,
  signer,
  approveErc20,
  toggler,
  setToggler,
}) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const mensajeBoton = () => {
    if (allowanceErc20 && allowanceErc20.gte(0)) {
      if (allowanceErc20?.lt(parseFloat(input))) {
        return textosExtra[currentLanguage].aprobar;
      }
      if (balanceErc20 && balanceErc20.lt(parseFloat(input))) {
        return textosExtra[currentLanguage].bceInsuf;
      } else {
        return textosExtra[currentLanguage].comprar;
      }
    } else {
      return "hola??";
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <button
        onClick={() => {
          if (true) {
            //  TODO: ?????
            allowanceErc20?.lt(Number(input))
              ? operationExecution(
                  approveErc20(
                    "0x1111111254eeb25477b68fb85ed929f73a960582",
                    ethers.utils.parseEther("99999999999")
                  )
                ).then(() => {
                  setToggler(!toggler);
                })
              : operationExecution(signer.sendTransaction(txData)).then(() => {
                  setToggler(!toggler);
                });
          }
        }}
        className="btnLarge"
      >
        {mensajeBoton()}
      </button>
    </>
  );
};

export default Boton1Inch;
