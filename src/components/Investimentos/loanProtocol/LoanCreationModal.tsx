import { useEffect, useState } from "react";
import BotonCrearLoan from "./BotonCrearLoan";
import { BigNumber, ethers } from "ethers";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getNewPriceQuotedAmt } from "../../../store/features/priceFeeder/priceFeederSlice";
import { useDispatch } from "react-redux";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import Modal from "react-modal";
interface LoanCreationModalProps {
  isOpen: boolean;
  inputAmount: string;
  closeModal: () => void;
  balanceUsdtLoanProtocol: BigNumber | undefined;
  balanceUserAmt: BigNumber | undefined;
  allowanceAmt: BigNumber | undefined;
  operacionAprobar: Function;
  operacionCrearLoan: Function;
}
const LoanCreationModal: React.FC<LoanCreationModalProps> = ({
  isOpen,
  inputAmount,
  closeModal,
  balanceUsdtLoanProtocol,
  balanceUserAmt,
  allowanceAmt,
  operacionAprobar,
  operacionCrearLoan,
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
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={"customModal"}
      overlayClassName={"customModalOverlay"}
    >
      <div className="modal">
        {pendingQuote ? (
          <div>Loading...</div>
        ) : (
          <>
            <button className="modalCloseButton" onClick={closeModal}>
              &times;
            </button>
            You will recive: {toFrontEndString(showUsdtAmount)}
            <div></div>
            <BotonCrearLoan
              balanceUsdtLoanProtocol={balanceUsdtLoanProtocol}
              balanceUserAmt={balanceUserAmt}
              allowanceAmt={allowanceAmt}
              input={inputAmount}
              operacionAprobar={operacionAprobar}
              operacionCrearLoan={operacionCrearLoan}
            ></BotonCrearLoan>
          </>
        )}
      </div>
    </Modal>
  );
};

export default LoanCreationModal;
