import React, { useRef, useState } from "react";
import { textoLoanProtocol, textosExtra } from "../../../Utils/textos";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { CSSTransition } from "react-transition-group";
import { ethers } from "ethers";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import BotonCrearLoan from "./botonCrearLoan";
import { loanProtocolOperations } from "../../../store/features/loanProtocol/loanProtocolOperations";
import { getNewPriceQuotedAmt } from "../../../store/features/priceFeeder/priceFeederSlice";

interface AmtStaking {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const LoanProtocol: React.FC<AmtStaking> = ({ setActivePage }) => {
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const dispatch = useDispatch<AppDispatch>();
  const inputAmountAmt = useRef<HTMLInputElement>(null);
  const [inputAmountAmtValue, setInputAmountAmtValue] = useState("");
  const balanceAmt = useSelector(
    (state: typeof RootState) => state.amt.balance
  );

  const balanceUsdt = useSelector(
    (state: typeof RootState) => state.usdt.balance
  );

  const allowanceAmtToLoanProtocol = useSelector(
    (state: typeof RootState) => state.loanProtocol.allowanceAmtToLoanProtocol
  );

  const allowanceUsdtToLoanProtocol = useSelector(
    (state: typeof RootState) => state.loanProtocol.allowanceUsdtToLoanProtocol
  );

  const pendingQuote = useSelector(
    (state: typeof RootState) => state.priceFeeder.pendingQuote
  );
  const loanRatio = useSelector(
    (state: typeof RootState) => state.loanProtocol.loanRatio
  );

  const usdtAvailable = useSelector(
    (state: typeof RootState) => state.loanProtocol.usdtAvailable
  );

  const priceAmt = useSelector(
    (state: typeof RootState) => state.priceFeeder.price1Amt
  );

  const latestBtcbPrice = useSelector(
    (state: typeof RootState) => state.priceFeeder.latestBtcbPrice
  );

  const priceQuotedAmt = useSelector(
    (state: typeof RootState) => state.priceFeeder.priceQuotedAmt
  );
  const userLoans = useSelector(
    (state: typeof RootState) => state.loanProtocol.userLoans
  );

  // Format the data for display
  const formattedLoanRatio = loanRatio
    ? `${(
        textosExtra[currentLanguage].loanRatio +
        ": " +
        (1 / parseFloat(loanRatio.toString())) * 100
      ).toString()} %`
    : "Loading...";
  const formattedUsdtAvailable = usdtAvailable
    ? `${
        textosExtra[currentLanguage].usdtDisponibles +
        ": " +
        ethers.utils.formatEther(usdtAvailable)
      }`
    : "Loading...";
  const formattedPriceAmt = priceAmt
    ? `${
        textosExtra[currentLanguage].precioAmt +
        " " +
        toFrontEndString(priceAmt)
      }`
    : "Loading...";
  const formattedLatestBtcbPrice = latestBtcbPrice
    ? `${
        textosExtra[currentLanguage].precioBtcb +
        ": " +
        latestBtcbPrice.toString()
      }`
    : "Loading...";
  const handleInputAmountAmt = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!pendingQuote) {
      setInputAmountAmtValue(event.target.value);
      dispatch(
        getNewPriceQuotedAmt(ethers.utils.parseEther(inputAmountAmtValue))
      );
    }
  };
  return (
    <>
      <div className="containerSlide">
        <div className="navBar_top">
          <img onClick={() => setActivePage("")} src="icon_nav.png" />
          <h1>{textosExtra[currentLanguage].inversiones}</h1>
        </div>

        {textoLoanProtocol(currentLanguage)}
        <div className="loan-protocol-diagram">
          <div>{formattedLoanRatio}</div>
          <div>{formattedUsdtAvailable}</div>
          <div>{formattedPriceAmt}</div>
          <div>{formattedLatestBtcbPrice}</div>
        </div>

        <div className="cuadroCompra">
          <img src="coinAutomining.png" alt="" />
          <div>AMT</div>
          <input
            ref={inputAmountAmt}
            placeholder="0"
            className="inputCompra"
            type="number"
            onChange={handleInputAmountAmt}
            value={inputAmountAmtValue}
          />

          <BotonCrearLoan
            balanceUsdtLoanProtocol={usdtAvailable}
            balanceUserAmt={balanceAmt}
            allowanceAmt={allowanceAmtToLoanProtocol}
            input={inputAmountAmtValue}
            operacionAprobar={loanProtocolOperations.approveAmtToLoanProtocol}
            operacionCrearLoan={loanProtocolOperations.createLoan}
          ></BotonCrearLoan>
        </div>
        {priceQuotedAmt && loanRatio
          ? "You will recive: " +
            toFrontEndString(priceQuotedAmt.mul(loanRatio)) +
            "USDT"
          : "dsadsa"}
      </div>
    </>
  );
};

export default LoanProtocol;
