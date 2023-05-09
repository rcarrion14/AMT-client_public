// @ts-nocheck
export const fetchVaultAmt = async () => {
  let endpointUsuarios =
    "https://amt-bucket-aws.s3.amazonaws.com/usuarios_VaulAmt.json";

  let endpointSwaps =
    "https://amt-bucket-aws.s3.amazonaws.com/lista_Swaps.json";

  let promiseList = [fetch(endpointUsuarios), fetch(endpointSwaps)];

  let responses = await Promise.all(promiseList);

  const dataStakings = await responses[0].json();
  const dataSwaps = await responses[1].json();

  return { dataStakings, dataSwaps };
};

export const fetchVaultBctb = async () => {
  let endpointUsuarios =
    "https://amt-bucket-aws.s3.amazonaws.com/usuarios_VaultBctb.json";

  let endpointSwaps =
    "https://amt-bucket-aws.s3.amazonaws.com/lista_Cobros.json";

  let promiseList = [fetch(endpointUsuarios), fetch(endpointSwaps)];

  let responses = await Promise.all(promiseList);

  const dataStakings = await responses[0].json();
  const dataCobros = await responses[1].json();

  return { dataStakings, dataCobros };
};

export const fetchBurnVaultTransfers = async () => {
  let endpointIngresosBurnVault =
    "https://amt-bucket-aws.s3.amazonaws.com/ingresosBurnVault.json";
  let dataIngresosBurnVault = await (
    await fetch(endpointIngresosBurnVault)
  ).json();
  let ret = [];
  for (let i = 0; i < dataIngresosBurnVault.length; i++) {
    let toAdd = {
      timestamp: formatDate(dataIngresosBurnVault[i].timeStamp * 1000),
      from: dataIngresosBurnVault[i].from,
      amount: dataIngresosBurnVault[i].value,
    };
    ret.push(toAdd);
  }
  return ret;
};

export const formatDate = (timestamp: number) => {
  let date = new Date(timestamp);
  date = date.toLocaleDateString();
  return date;
};
