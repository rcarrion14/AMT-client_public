import React from "react";
import { ethers } from "ethers";
import moment from "moment";
import { toFrontEndString } from "../../../Utils/formatHelpers";

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
};

const LoanItem: React.FC<LoanProps> = ({ loan }) => {
  const formatDate = (timestamp: ethers.BigNumber) => {
    // This will format the timestamp according to the user's local timezone
    return moment
      .unix(timestamp.toNumber())
      .local()
      .format("MMM D, YYYY HH:mm");
  };
  console.log("collateral locked: " + loan.collateralLocked);
  console.log("loan.loanPrice: " + loan.loanPrice);
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
            /* logic to close loan */
          }}
        >
          Close Loan
        </button>
      </td>
    </tr>
  );
};

export default LoanItem;
