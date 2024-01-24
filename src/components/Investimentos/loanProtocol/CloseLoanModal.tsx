import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import CloseLoanButton from "./CloseLoanButton";
interface CloseLoanModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  totalLoanAmount: BigNumber;
  loanIndex: number;
}

const CloseLoanModal: React.FC<CloseLoanModalProps> = ({
  isOpen,
  onRequestClose,
  totalLoanAmount,
  loanIndex,
}) => {
  const [repaymentPercentage, setRepaymentPercentage] = useState<number>(100);
  const [repaymentAmount, setRepaymentAmount] = useState<string>(
    toFrontEndString(totalLoanAmount, 4)
  );

  useEffect(() => {
    const repaymentBigNumber = totalLoanAmount
      .mul(repaymentPercentage)
      .div(100);

    setRepaymentAmount(toFrontEndString(repaymentBigNumber, 50));
  }, [repaymentPercentage, totalLoanAmount]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepaymentPercentage(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = totalLoanAmount.gte(
      ethers.utils.parseEther(e.target.value)
    )
      ? e.target.value
      : toFrontEndString(totalLoanAmount, 4);
    setRepaymentAmount(inputAmount);
    const newPercentage = ethers.utils
      .parseEther(inputAmount)
      .mul(100000)
      .div(totalLoanAmount);
    setRepaymentPercentage(parseFloat(newPercentage.toString()) / 100);
  };

  const handleCloseLoan = () => {
    console.log("closing");
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={"customModal"}
      overlayClassName={"customModalOverlay"}
    >
      <button className="modalCloseButton" onClick={onRequestClose}>
        &times;
      </button>
      <h2>Close Loan</h2>
      <p>
        Choose the amount to repay for loan #{loanIndex} for amount{" "}
        {toFrontEndString(totalLoanAmount, 4)} USDT
      </p>
      <input
        type="range"
        min="0"
        max="100"
        value={repaymentPercentage}
        onChange={handleSliderChange}
      />
      <div className="inputGroup">
        <input
          className="LoanModalInput"
          type="number"
          value={repaymentAmount}
          onChange={handleInputChange}
          min="0"
        />
        <CloseLoanButton
          loanIndex={loanIndex}
          amountToClose={ethers.utils.parseEther(
            parseFloat(repaymentAmount).toFixed(18)
          )}
        ></CloseLoanButton>
      </div>
    </Modal>
  );
};

export default CloseLoanModal;
