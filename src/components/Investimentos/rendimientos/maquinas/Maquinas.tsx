import React, { useEffect, useState } from "react";
import CuadroMaquinas from "./CuadroMaquinas";
import { getAllDataMineria } from "../../../../Utils/datosMineria";
import { dataMineriaInterface } from "../../../../Utils/datosMineria";
interface MaquinasInterface {
  setActivePage: React.Dispatch<React.SetStateAction<string | boolean>>;
}

const Maquinas: React.FC<MaquinasInterface> = ({ setActivePage }) => {
  const [data, setData] = useState<dataMineriaInterface | null>(null);

  useEffect(() => {
    getAllDataMineria().then((result) => setData(result));
  }, []);

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setActivePage("")} src="icon_nav.png" />
        <h1>Rendimentos</h1>
      </div>
      <h2>Máquinas ativas no Projeto AMT</h2>
      <CuadroMaquinas
        maquinas={
          data
            ? data.antPool.workers + data.viaBtc.workers + data.slush.workers
            : null
        }
        petahash={
          data
            ? Number(
                (
                  (data.antPool.hashrate +
                    data.viaBtc.hashrate +
                    data.slush.hashrate) /
                  10 ** 15
                ).toFixed(1)
              )
            : null
        }
        produccion={
          data
            ? (
                data.antPool.profit +
                data.viaBtc.profit +
                data.slush.profit
              ).toFixed(5)
            : null
        }
        logo={"coinAutomining.png"}
      />
      As máquinas do AMT estao divididas em diferentes pools, conforme vocé pode
      conferir abaixo
      <CuadroMaquinas
        maquinas={data ? data.antPool.workers : null}
        petahash={
          data ? Number((data.antPool.hashrate / 10 ** 15).toFixed(1)) : null
        }
        produccion={data ? data.antPool.profit.toFixed(5) : null}
        logo={"antPool_logo.png"}
      />
      <div>
        <a href="https://v3.antpool.com/observer?accessKey=Bl4vdwpwVUcUoFL6fQ3s&coinType=BTC&observerUserId=autominingtoken">
          <u>Link de observador</u>
        </a>
      </div>
      <CuadroMaquinas
        maquinas={data ? data.viaBtc.workers : null}
        petahash={
          data ? Number((data.viaBtc.hashrate / 10 ** 15).toFixed(1)) : null
        }
        produccion={data ? data.viaBtc.profit.toFixed(5) : null}
        logo={"viaBTC_logo.png"}
      />
      <div>
        <a href="https://www.viabtc.net/observer/dashboard?access_key=6a6b97443bd15313c2a8d9c3d33c40f0">
          <u>Link de observador (1) - </u>
        </a>
        <a href="">
          <u>Link de observador(2)</u>
        </a>
      </div>
      <CuadroMaquinas
        maquinas={data ? data.slush.workers : null}
        petahash={
          data ? Number((data.slush.hashrate / 10 ** 15).toFixed(1)) : null
        }
        produccion={data ? data.slush.profit.toFixed(5) : null}
        logo={"slushPool_logo.png"}
      />
    </div>
  );
};

export default Maquinas;
