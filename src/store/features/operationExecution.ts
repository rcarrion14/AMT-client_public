import { toast } from "react-toastify";
export async function operationExecution(operation: Promise<any>) {
  const initialiceTransaction = toast.info(
    "iniciando operation : requiere aprobación en billetera",
    {
      autoClose: 30000,
      hideProgressBar: true,
      style: {
        background: "white",
        color: "black",
        justifyContent: "center",
      },
    }
  );
  return operation
    .then((execution) => {
      toast.dismiss(initialiceTransaction);
      const transactionInProgress = toast.loading("transaccion en proceso...");
      return execution
        .wait()
        .then(() => {
          toast.dismiss(transactionInProgress);
          toast.success("operacion finalizada");
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
