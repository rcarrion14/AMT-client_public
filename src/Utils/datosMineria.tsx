export async function getThsDisponibles() {
  let data = await fetch(
    "https://y9zepslk4c.execute-api.us-east-1.amazonaws.com/default/1-getViaBtc"
  ).then((response) => response.json());
  return data.hashrate;
}

export async function getBtcUltimoDia() {
  let data = await fetch(
    "https://y9zepslk4c.execute-api.us-east-1.amazonaws.com/default/1-getViaBtc"
  ).then((response) => response.json());
  return data.profit;
}

export async function getDatosAntPool() {
  let data = await fetch(
    "https://zh1difw565.execute-api.us-east-1.amazonaws.com/default/1-getInfoMineria"
  ).then((response) => response.json());
  return data[1];
}

export async function getDatosPoolViaBtc() {
  let data = await fetch(
    "https://zh1difw565.execute-api.us-east-1.amazonaws.com/default/1-getInfoMineria"
  ).then((response) => response.json());
  return data[0];
}

export interface poolDataInterface {
  fecha: string;
  fuente: string;
  hashrate: number;
  profit: number;
  tstamp: number;
  workers: number;
}
export interface dataMineriaInterface {
  thsDisponible: number;
  btcbUltimoDia: number;
  antPool: poolDataInterface;
  viaBtc: poolDataInterface;
}

export async function getAllDataMineria() {
  const promiseList = [];

  promiseList.push(getThsDisponibles());
  promiseList.push(getBtcUltimoDia());
  promiseList.push(getDatosAntPool());
  promiseList.push(getDatosPoolViaBtc());

  let data = await Promise.all(promiseList);

  let dataDict = {
    thsDisponible: data[0],
    btcbUltimoDia: data[1],
    antPool: data[2],
    viaBtc: data[3],
  };

  return dataDict;
}
