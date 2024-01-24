import React, { useState } from "react";
import { ethers } from "ethers";
import moment from "moment";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import CloseLoanModal from "./CloseLoanModal";
// Define the type for the loan prop based on your LoanStructOutput type
type LoanProps = {
  loan: {
    amountBorrowed: ethers.BigNumber;
    collateralLocked: ethers.BigNumber;
    loanTimestamp: ethers.BigNumber;
    loanPrice: ethers.BigNumber;
    loanRatio: ethers.BigNumber;

    // Add any other properties from LoanStructOutput that you need
  };
  loanIndex: number;
};
const LoanItem: React.FC<LoanProps> = ({ loan, loanIndex }) => {
  const formatDate = (timestamp: ethers.BigNumber) => {
    // This will format the timestamp according to the user's local timezone
    return moment
      .unix(timestamp.toNumber())
      .local()
      .format("MMM D, YYYY HH:mm");
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const estimatedLiquidationPrice =
    parseFloat(loan.loanPrice.toString()) /
    parseFloat(loan.collateralLocked.toString()) /
    parseFloat(loan.loanRatio.toString());

  return (
    <tr className="loan-item-row">
      <td className="loan-amount">{toFrontEndString(loan.amountBorrowed)}</td>
      <td className="loan-collateral">
        {toFrontEndString(loan.collateralLocked)}
      </td>
      <td className="loan-timestamp">{formatDate(loan.loanTimestamp)}</td>
      <td className="loan-price">{toFrontEndString(loan.loanPrice)}</td>
      <td className="loan-liquidation-price">
        {toFrontEndString(
          ethers.utils.parseEther(estimatedLiquidationPrice.toString())
        )}
      </td>
      <td className="loan-actions">
        <button
          className="close-loan-button"
          onClick={() => {
            openModal();
          }}
        >
          Close Loan
        </button>
      </td>
      <CloseLoanModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        loanIndex={loanIndex}
        totalLoanAmount={loan.amountBorrowed}
      ></CloseLoanModal>
    </tr>
  );
};

export default LoanItem;
