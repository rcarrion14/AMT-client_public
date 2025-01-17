import React, { useEffect, useRef, useState } from "react";
import SelectorMoneda from "./SelectorMonedaPancake";
import { CSSTransition } from "react-transition-group";
import BotonOperacionPancake from "./BotonOperacionPancake";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { ethers, BigNumber } from "ethers";
import { listaMonedas } from "../../../Utils/listaMonedas";
import contractAddresses from "../../../contracts/contractAddresses";
import abiErc20 from "../../../contracts/abis/genericERC20.json";
import { useGetQuote, useGetTxData } from "../../../Utils/1inch";
import { textosExtra } from "../../../Utils/textos";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import { TransactionDataInterface } from "../AmtStore/Inch/CuadroInterfaz1Inch";
interface CuadroPancakeProps {
  selector: boolean;
  setSelector: React.Dispatch<React.SetStateAction<boolean>>;
}
const CuadroPancake: React.FC<CuadroPancakeProps> = ({
  selector,
  setSelector,
}) => {
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );

  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const precioAmt = useSelector(
    (state: typeof RootState) => state.amt.precioEnUsdt
  );
  const signer = useSelector((state: typeof RootState) => state.wallet.signer);
  const addr = useSelector((state: typeof RootState) => state.wallet.address);

  const [monedaActive, setmonedaActive] = useState(listaMonedas.usdt);
  const [inputPagarValue, setInputPagarValue] = useState("");
  const [inputRecibirValue, setInputRecibirValue] = useState("");
  const [balanceErc20, setBalanceErc20] = useState(BigNumber.from(0));
  const [allowanceErc20, setAllowanceErc20] = useState(BigNumber.from(0));
  const [approveErc20, setApproveErc20] = useState<Function | null>(null);
  const [txData, setTxData] = useState<TransactionDataInterface>();

  const [toggler, setToggler] = useState(false);
  const inputPagar = useRef<HTMLInputElement>(null);
  const inputRecibir = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      addr &&
      inputPagarValue &&
      parseFloat(inputPagarValue) != 0 &&
      allowanceErc20.gt(ethers.utils.parseEther(inputPagarValue)) &&
      balanceErc20.gt(ethers.utils.parseEther(inputPagarValue))
    ) {
      useGetTxData(
        monedaActive.address,
        contractAddresses.Amt,
        inputPagarValue,
        addr
      ).then((result) => {
        setTxData(result);
      });
    } else {
      setTxData(undefined);
    }
  }, [inputPagarValue, inputRecibirValue, toggler]);

  useEffect(() => {
    if (signer) {
      var contractErc20 = new ethers.Contract(
        monedaActive.address,
        abiErc20,
        signer
      );
    }

    async function fetchData() {
      setBalanceErc20(await contractErc20.balanceOf(addr));
      setAllowanceErc20(
        await contractErc20.allowance(
          addr,
          "0x1111111254eeb25477b68fb85ed929f73a960582"
        )
      );

      setApproveErc20(() => contractErc20.approve);
    }

    fetchData();
  }, [toggler, monedaActive]);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputPagarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (parseFloat(event.target.value) >= 0) {
      setInputPagarValue(event.target.value);
      useGetQuote(
        monedaActive.address,
        contractAddresses.Amt,
        event.target.value
      ).then((response) => {
        setInputRecibirValue(toFrontEndString(response.toTokenAmount));
      });
    } else {
      setInputPagarValue("");
      setInputRecibirValue("");
    }
  };

  const handleInputRecibirChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (parseFloat(event.target.value) >= 0) {
      setInputRecibirValue(event.target.value);
      useGetQuote(
        contractAddresses.Amt,
        monedaActive.address,
        event.target.value
      ).then((response) => {
        setInputPagarValue(toFrontEndString(response.toTokenAmount));
      });
    } else {
      setInputPagarValue("");
      setInputRecibirValue("");
    }
  };

  //Esto de arriba

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>{textosExtra[currentLanguage].ustedPaga}</h2>
          <p>
            {textosExtra[currentLanguage].saldo}{" "}
            {balanceErc20 ? toFrontEndString(balanceErc20) : "-"}
          </p>
        </div>
        <div className="cuadroCompra">
          <img
            onClick={() => {
              setSelector(true);
            }}
            src={monedaActive.logoURI}
          />
          <div
            onClick={() => {
              setSelector(true);
            }}
          >
            {monedaActive.symbol}
          </div>
          <img
            onClick={() => {
              setSelector(true);
            }}
            src="arrow-down-navigate.png"
            className="flecha"
            alt=""
          />
          <input
            ref={inputPagar}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={handleInputPagarChange}
            value={inputPagarValue}
          />
        </div>
      </div>
      <div id="segundaSeccion">
        <div className="saldo">
          <h2>{textosExtra[currentLanguage].ustedRecibe}</h2>
          <p>
            {textosExtra[currentLanguage].saldo}{" "}
            {balanceAmt ? toFrontEndString(balanceAmt) : "-"}
          </p>
        </div>
        <div className="cuadroCompra">
          <img src="coinAutomining.png" alt="" />
          <div>AMT</div>
          <input
            ref={inputRecibir}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={handleInputRecibirChange}
            value={inputRecibirValue}
          />
        </div>
      </div>
      <div className="soloSaldo">
        <div>
          <h2>{textosExtra[currentLanguage].precioAmt}</h2>
          <div>1 AMT = {precioAmt?.toFixed(3)} USDT</div>
          <div className="slippage">
            <b>Slippage Tolerance 1%</b>
          </div>
        </div>
      </div>

      <div>
        <BotonOperacionPancake
          balanceErc20={balanceErc20}
          allowanceErc20={allowanceErc20}
          txData={txData}
          input={inputPagarValue}
          signer={signer}
          approveErc20={approveErc20}
          toggler={toggler}
          setToggler={setToggler}
        />
      </div>

      <CSSTransition
        in={selector}
        timeout={700}
        classNames="animacionSelector"
        unmountOnExit
      >
        <SelectorMoneda
          setmonedaActive={setmonedaActive}
          monedaActive={monedaActive}
          setSelector={setSelector}
        />
      </CSSTransition>
    </>
  );
};

export default CuadroPancake;
