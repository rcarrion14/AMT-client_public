export async function operationExecution(operation: Promise<any>) {
  alert("starting operation");
  return operation.then((execution) => {
    return execution.wait().then(() => {
      alert("operation completed");
      return true;
    });
  });
}
