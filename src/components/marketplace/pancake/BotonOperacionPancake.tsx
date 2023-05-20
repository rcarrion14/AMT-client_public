import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { textosExtra } from "../../../Utils/textos";
import { BigNumber, ethers } from "ethers";
import { operationExecution } from "../../../store/features/operationExecution";
import { TransactionDataInterface } from "../AmtStore/Inch/CuadroInterfaz1Inch";
import { useGetTxData } from "../../../Utils/1inch";

interface BotonOperacionProps {
  balanceErc20: BigNumber | undefined;
  allowanceErc20: BigNumber | undefined;
  txData: TransactionDataInterface | undefined;
  input: string;
  signer: any;
  approveErc20: Function | null;
  toggler: any;
  setToggler: any;
}
const BotonOperacion: React.FC<BotonOperacionProps> = ({
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
    console.log({ input, allowanceErc20, balanceErc20 });

    if (allowanceErc20 && ethers.utils.parseEther(input).gt(allowanceErc20)) {
      return textosExtra[currentLanguage].aprobar;
    }
    if (balanceErc20 && balanceErc20.lt(ethers.utils.parseEther(input))) {
      return textosExtra[currentLanguage].bceInsuf;
    } else {
      return textosExtra[currentLanguage].comprar;
    }
  };

  return (
    <>
      <button
        onClick={() => {
          approveErc20 &&
          allowanceErc20 &&
          allowanceErc20.lt(ethers.utils.parseEther(input))
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
        }}
        className="btnLarge"
      >
        {input != "" && balanceErc20
          ? mensajeBoton()
          : textosExtra[currentLanguage].comprar}
      </button>
    </>
  );
};

export default BotonOperacion;
