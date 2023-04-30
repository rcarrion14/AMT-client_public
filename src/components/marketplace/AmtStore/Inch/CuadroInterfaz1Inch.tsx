// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import SelectorMoneda1Inch from "./SelectorMoneda1Inch";
import { CSSTransition } from "react-transition-group";
import Boton1Inch from "./Boton1Inch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { ethers } from "ethers";
import { listaMonedas } from "../../../../Utils/listaMonedas";
import contractAddresses from "../../../../contracts/contractAddresses";
import abiErc20 from "../../../../contracts/abis/genericERC20.json";
import {
  useGetQuote,
  useGetTokens,
  useGetTxData,
} from "../../../../Utils/1inch";

const CuadroInterfaz1Inch = () => {
  const balanceUsdt = useSelector(
    (state: typeof RootState) => state.usdt.balance
  );
  const signer = useSelector((state: typeof RootState) => state.wallet.signer);
  const addr = useSelector((state: typeof RootState) => state.wallet.address);

  const [selector, setSelector] = useState(false);
  const [monedaActive, setmonedaActive] = useState(listaMonedas.btcb);
  const [inputPagarValue, setInputPagarValue] = useState("");
  const [inputRecibirValue, setInputRecibirValue] = useState("");
  const [balanceErc20, setBalanceErc20] = useState(0);
  const [allowanceErc20, setAllowanceErc20] = useState(0);
  const [approveErc20, setApproveErc20] = useState<Function | null>(null);
  const [txData, setTxData] = useState();
  const [tokenList, setTokenList] = useState({});

  const inputPagar = useRef<HTMLInputElement>(null);
  const inputRecibir = useRef<HTMLInputElement>(null);

  useEffect(() => {
    useGetTokens().then((result) => {
      setTokenList(result);
    });
  }, []);

  // Pedir quote:
  useEffect(() => {
    if (inputPagarValue) {
      useGetQuote(
        monedaActive.address,
        contractAddresses.Usdt,
        inputPagarValue
      ).then((response) => {
        setInputRecibirValue(ethers.utils.formatEther(response.toTokenAmount));
      });
    }
  }, [inputPagarValue, monedaActive]);

  useEffect(() => {
    if (
      inputPagarValue &&
      allowanceErc20 > Number(inputPagarValue) &&
      balanceErc20 > Number(inputPagarValue)
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
  }, [inputPagarValue]);

  useEffect(() => {
    const contractErc20 = new ethers.Contract(
      monedaActive.address,
      abiErc20,
      signer
    );

    async function fetchData() {
      setBalanceErc20(
        Number(ethers.utils.formatEther(await contractErc20.balanceOf(addr)))
      );
      setAllowanceErc20(
        Number(
          ethers.utils.formatEther(
            await contractErc20.allowance(
              addr,
              "0x1111111254eeb25477b68fb85ed929f73a960582"
            )
          )
        )
      );

      setApproveErc20(() => contractErc20.approve);
    }

    fetchData();
  }, [monedaActive, inputPagarValue]);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputPagarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputPagarValue(event.target.value);
  };

  const handleInputRecibirChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputRecibirValue(event.target.value);
  };

  //Esto de arriba

  return (
    <>
      <div id="primeraSeccion">
        <div className="saldo">
          <h2>Vocé paga</h2>
          <p>Saldo: {balanceErc20}</p>
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
          <div>{monedaActive.symbol}</div>
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
          <h2>Vocé recebe</h2>
          <p>Saldo: {balanceUsdt}</p>
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
      <div className="containerSaldos">
        <div>
          <h2>AMT a venda:</h2>
          <div>{}</div>
        </div>
        <div>
          <h2>Preco do AMT:</h2>
          <div>1 AMT = {""} USDT</div>
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
          addr={addr}
        />
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
    </>
  );
};

export default CuadroInterfaz1Inch;
