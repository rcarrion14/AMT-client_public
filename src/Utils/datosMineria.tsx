export async function getThsDisponibles() {
  let data = await fetch(
    "https://uudmapuelg.execute-api.us-east-1.amazonaws.com/default/getViaBTC"
  ).then((response) => response.json());
  return data.hashrate;
}

export async function getBtcUltimoDia() {
  let data = await fetch(
    "https://uudmapuelg.execute-api.us-east-1.amazonaws.com/default/getViaBTC"
  ).then((response) => response.json());
  return data.profit;
}

export async function getDatosAntPool() {
  let data = await fetch(
    "https://2yp9f3r7w8.execute-api.us-east-1.amazonaws.com/default/getInfoMineria"
  ).then((response) => response.json());
  return data[1];
}

export async function getDatosPoolViaBtc() {
  let data = await fetch(
    "https://2yp9f3r7w8.execute-api.us-east-1.amazonaws.com/default/getInfoMineria"
  ).then((response) => response.json());
  return data[0];
}

export async function getDatosPoolBraiins() {
  let data = await fetch(
    "https://2yp9f3r7w8.execute-api.us-east-1.amazonaws.com/default/getInfoMineria"
  ).then((response) => response.json());
  return data[2];
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
  slush: poolDataInterface;
  viaBtc: poolDataInterface;
}

export async function getAllDataMineria() {
  const promiseList = [];

  promiseList.push(getThsDisponibles());
  promiseList.push(getBtcUltimoDia());
  promiseList.push(getDatosAntPool());
  promiseList.push(getDatosPoolBraiins());
  promiseList.push(getDatosPoolViaBtc());

  let data = await Promise.all(promiseList);

  let dataDict = {
    thsDisponible: data[0],
    btcbUltimoDia: data[1],
    antPool: data[2],
    slush: data[3],
    viaBtc: data[4],
  };
  console.log(dataDict);

  return dataDict;
}
