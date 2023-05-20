import React, { useEffect, useRef, useState } from "react";
import SelectorMoneda1Inch from "./SelectorMoneda1Inch";
import { CSSTransition } from "react-transition-group";
import Boton1Inch from "./Boton1Inch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { ethers, BigNumber } from "ethers";
import { listaMonedas, monedaInterface } from "../../../../Utils/listaMonedas";
import contractAddresses from "../../../../contracts/contractAddresses";
import abiErc20 from "../../../../contracts/abis/genericERC20.json";

import {
  useGetQuote,
  useGetTokens,
  useGetTxData,
} from "../../../../Utils/1inch";
import { textosExtra } from "../../../../Utils/textos";
import { toFrontEndString } from "../../../../Utils/formatHelpers";

export interface TransactionDataInterface {
  data: string;
  from: string;
  to: string;
}
const CuadroInterfaz1Inch = () => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const balanceUsdt = useSelector(
    (state: typeof RootState) => state.usdt.balance
  );
  const signer = useSelector((state: typeof RootState) => state.wallet.signer);
  const addr = useSelector((state: typeof RootState) => state.wallet.address);

  const [selector, setSelector] = useState(false);
  const [monedaActive, setmonedaActive] = useState<monedaInterface>(
    listaMonedas.btcb
  );
  const [inputPagarValue, setInputPagarValue] = useState("");
  const [inputRecibirValue, setInputRecibirValue] = useState("");
  const [balanceErc20, setBalanceErc20] = useState(BigNumber.from(0));
  const [allowanceErc20, setAllowanceErc20] = useState(BigNumber.from(0));
  const [approveErc20, setApproveErc20] = useState<Function | null>(null);
  const [txData, setTxData] = useState<TransactionDataInterface>();
  const [tokenList, setTokenList] = useState({});
  const [toggler, setToggler] = useState(false);

  const inputPagar = useRef<HTMLInputElement>(null);
  const inputRecibir = useRef<HTMLInputElement>(null);

  useEffect(() => {
    useGetTokens().then((result) => {
      setTokenList(result);
    });
  }, []);

  // getting Tx data
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
        contractAddresses.Usdt,
        inputPagarValue,
        addr
      ).then((result) => {
        setTxData(result);
      });
    }
  }, [inputPagarValue, inputRecibirValue, monedaActive, toggler]);

  // cargando ERC20 generico

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
  }, [monedaActive, inputPagarValue, toggler]);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputPagarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (parseFloat(event.target.value) >= 0) {
      setInputPagarValue(event.target.value);
      useGetQuote(
        monedaActive.address,
        contractAddresses.Usdt,
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
        contractAddresses.Usdt,
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
    <div>
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
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "icon_question.png";
            }}
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
            {textosExtra[currentLanguage].saldo}
            {balanceUsdt ? toFrontEndString(balanceUsdt) : "-"}
          </p>
        </div>
        <div className="cuadroCompra">
          <img src="coinT.png" alt="" />
          <div>USDT</div>
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

      <div>
        <Boton1Inch
          balanceUsdt={balanceUsdt}
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

      <div className="slippage">
        <b>Slippage Tolerance 1%</b>
      </div>

      <CSSTransition
        in={selector}
        timeout={700}
        classNames="animacionSelector"
        unmountOnExit
      >
        <SelectorMoneda1Inch
          setmonedaActive={setmonedaActive}
          monedaActive={monedaActive}
          setSelector={setSelector}
          tokenList={tokenList}
        />
      </CSSTransition>
    </div>
  );
};

export default CuadroInterfaz1Inch;
