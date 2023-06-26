import { ethers, BigNumber } from "ethers";

export type ingresosType = {
  from: any;
  amount: BigNumber;
  timestamp: any;
  to: any;
};
export interface dataStakingValue {
  amount: string;
  snap: number;
  tstamp: number;
}

export interface dataSwapsValue {
  amount: string;
  snap: number;
  tstamp: number;
}

export interface dataCobrosValue {
  amount: string;
  snap: number;
  tstamp: number;
}

export type dataStakingType = {
  [key: string]: dataStakingValue;
};
export interface FetchVaultAmtResult {
  dataStakings: dataStakingType;
  dataSwaps: dataSwapsValue[];
}

export interface FetchVaultBtcbResult {
  dataStakings: dataStakingType;
  dataCobros: dataCobrosValue[];
}

export const updateBucketsData = async (): Promise<Boolean> => {
  const updateBucketsEndPoint =
    "https://y6lrq3pwi7.execute-api.us-east-1.amazonaws.com/default/getStakingsIniciales";
  const response = await fetch(updateBucketsEndPoint, {
    method: "GET",
    headers: {'Content-Type': 'application/json'},
    cache: "no-cache",
  });
  console.log(response);
  return true;
};

export const fetchVaultAmt = async (): Promise<FetchVaultAmtResult> => {
  let endpointUsuarios =
    "https://amt-bucket-aws.s3.amazonaws.com/usuarios_VaulAmt.json";

  let endpointSwaps =
    "https://amt-bucket-aws.s3.amazonaws.com/lista_Swaps.json";

  let promiseList = [
    fetch(endpointUsuarios, { cache: "no-cache" }),
    fetch(endpointSwaps, { cache: "no-cache" }),
  ];

  let responses = await Promise.all(promiseList);

  const dataStakings: dataStakingType = await responses[0].json();
  const dataSwaps: dataSwapsValue[] = await responses[1].json();

  return { dataStakings, dataSwaps };
};

export const fetchVaultBctb = async (): Promise<FetchVaultBtcbResult> => {
  let endpointUsuarios =
    "https://amt-bucket-aws.s3.amazonaws.com/usuarios_VaultBctb.json";

  let endpointSwaps =
    "https://amt-bucket-aws.s3.amazonaws.com/lista_Cobros.json";

  let promiseList = [
    fetch(endpointUsuarios, { cache: "no-cache" }),
    fetch(endpointSwaps, { cache: "no-cache" }),
  ];

  let responses = await Promise.all(promiseList);

  const dataStakings: dataStakingType = await responses[0].json();
  const dataCobros: dataCobrosValue[] = await responses[1].json();

  return { dataStakings, dataCobros };
};

export const fetchBurnVaultTransfers = async (): Promise<ingresosType[]> => {
  let endpointIngresosBurnVault =
    "https://amt-bucket-aws.s3.amazonaws.com/ingresosBurnVault.json";
  let dataIngresosBurnVault = await (
    await fetch(endpointIngresosBurnVault, { cache: "no-cache" })
  ).json();
  let ret = [];
  for (let i = 0; i < dataIngresosBurnVault.length; i++) {
    let toAdd = {
      timestamp: formatDate(dataIngresosBurnVault[i].timeStamp * 1000),
      from: dataIngresosBurnVault[i].from,
      amount: BigNumber.from(dataIngresosBurnVault[i].value),
      to: dataIngresosBurnVault[i].to,
    };
    ret.push(toAdd);
  }
  return ret;
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const dateConverted = date.toLocaleDateString();
  return dateConverted;
};
