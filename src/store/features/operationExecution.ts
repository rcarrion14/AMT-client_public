import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export async function operationExecution(operation: Promise<any>) {
  const baseUrl = "https://bscscan.com/tx/";

  const initialiceTransaction = toast.info(
    "Starting operation : require wallet accept"
  );
  return operation
    .then((execution) => {
      toast.dismiss(initialiceTransaction);
      const transactionInProgress = toast.loading("Transaction in progress...");
      return execution
        .wait()
        .then(() => {
          toast.dismiss(transactionInProgress);
          const link = React.createElement(
            "span",
            null,
            "Operation finished successfully - ",
            React.createElement(
              "a",
              {
                href: baseUrl + execution.hash,
                target: "_blank",
                rel: "noopener noreferrer",
              },
              "here"
            ),
            " to view the transaction details."
          );
          toast.success(link);
          return true;
        })
        .catch(() => {
          toast.dismiss(transactionInProgress);
          toast.error(`Transaction failed`);
        });
    })
    .catch((error) => {
      toast.dismiss(initialiceTransaction);
      toast.error(`Error: ${error.message}`);
    });
}
