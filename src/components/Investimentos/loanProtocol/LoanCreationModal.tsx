import { useEffect, useState } from "react";
import BotonCrearLoan from "./BotonCrearLoan";
import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getNewPriceQuotedAmt } from "../../../store/features/priceFeeder/priceFeederSlice";
import { useDispatch } from "react-redux";
import { toFrontEndString } from "../../../Utils/formatHelpers";

interface LoanCreationModalProps {
  inputAmount: string;
  closeModal: Function;
  balanceUsdtLoanProtocol: BigNumber | undefined;
  balanceUserAmt: BigNumber | undefined;
  allowanceAmt: BigNumber | undefined;
  operacionAprobar: Function;
  operacionCrearLoan: Function;
}
const LoanCreationModal: React.FC<LoanCreationModalProps> = ({
  inputAmount,
  closeModal,
  balanceUsdtLoanProtocol,
  balanceUserAmt,
  allowanceAmt,
  operacionAprobar,
  operacionCrearLoan,
  // ... other props
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState("0");
  const pendingQuote = useSelector(
    (state: typeof RootState) => state.priceFeeder.pendingQuote
  );

  const priceQuotedAmt = useSelector(
    (state: typeof RootState) => state.priceFeeder.priceQuotedAmt
  );

  const loanRatio = useSelector(
    (state: typeof RootState) => state.loanProtocol.loanRatio
  );
  useEffect(() => {
    // Fetch blockchain data
    const fetchData = async () => {
      try {
        // Replace with actual blockchain query logic

        dispatch(getNewPriceQuotedAmt(ethers.utils.parseEther(inputAmount)));
      } catch (error) {
        console.error("Error fetching blockchain data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputAmount]);

  const showUsdtAmount =
    priceQuotedAmt && loanRatio
      ? priceQuotedAmt.div(loanRatio)
      : BigNumber.from(0);
  return (
    <div className="modal">
      {pendingQuote ? (
        <div>Loading...</div>
      ) : (
        <>
          You will recive: {toFrontEndString(showUsdtAmount)}
          <div></div>
          "dsadsa"
          <BotonCrearLoan
            balanceUsdtLoanProtocol={balanceUsdtLoanProtocol}
            balanceUserAmt={balanceUserAmt}
            allowanceAmt={allowanceAmt}
            input={inputAmount}
            operacionAprobar={operacionAprobar}
            operacionCrearLoan={operacionCrearLoan}
          ></BotonCrearLoan>
          <button
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};

export default LoanCreationModal;
