import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import LoanItem from "./LoanItem"; // Adjust the path as needed

const UserLoanList: React.FC = () => {
  const userLoans = useSelector(
    (state: typeof RootState) => state.loanProtocol.userLoans
  );

  return (
    <table className="loan-table">
      <thead className="loan-table-header">
        <tr>
          <th className="loan-header-amount">Amount Borrowed</th>
          <th className="loan-header-collateral">Collateral Locked</th>
          <th className="loan-header-timestamp">Loan Date</th>
          <th className="loan-header-price">Loan Price</th>
          <th className="loan-header-liquidation-price">
            Est. Liquidation Price
          </th>

          <th className="loan-header-actions">Actions</th>
        </tr>
      </thead>
      <tbody className="loan-table-body">
        {userLoans?.map((loan, index) => (
          <LoanItem key={index} loan={loan} loanIndex={index} />
        ))}
      </tbody>
    </table>
  );
};

export default UserLoanList;
