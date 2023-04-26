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
      },
    }
  );
  return operation.then((execution) => {
    toast.dismiss(initialiceTransaction);
    const transactionInProgress = toast.loading("transaccion en proceso...");
    return execution.wait().then(() => {
      toast.dismiss(transactionInProgress);
      toast.success("operacion finalizada");
      return true;
    });
  });
}
