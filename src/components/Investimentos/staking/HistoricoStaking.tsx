// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Historico = ({ setHistorico, stackedByUser, currentSnapshot }) => {
  const [stakingIniciales, setStakingIniciales] = useState(undefined);
  const [fechasSwaps, setFechasSwaps] = useState([]);
  const addr = useSelector((state: typeof RootState) => state.wallet.address);

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const responseStakings = await fetch(
        "https://amt-bucket-aws.s3.amazonaws.com/ultimosStaking.json",
        params
      );
      const dataStakings = await responseStakings.json();

      const responseFechasSwaps = await fetch(
        "https://amt-bucket-aws.s3.amazonaws.com/fechasSwaps.json",
        params
      );
      const dataFechasSwaps = await responseFechasSwaps.json();

      return { dataStakings, dataFechasSwaps };
    }

    fetchData().then((result) => {
      setStakingIniciales(result.dataStakings);
      setFechasSwaps(result.dataFechasSwaps);
    });
  }, []);

  const formatDate = (timestamp: number) => {
    let date = new Date(timestamp);
    date = date.toLocaleDateString();
    return date;
  };

  const listaDeContainers = fechasSwaps.map((swaps) => {
    return stakingIniciales[addr?.toLowerCase()].tstamp < swaps.date ? (
      <div key={swaps} className="cuadroStakings">
        <img className="activeIcon" src="arrow-down.png" alt="" />
        <div className="transparente">
          <p>
            <b>Autocompra de AMT</b>
          </p>
          <p>{formatDate(swaps.date)}</p>
        </div>
        <div className="transparente"> + 150AMT</div>
      </div>
    ) : null;
  });

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setHistorico(false)} src="icon_nav.png" />
        <h1>Staking Padrao</h1>
      </div>

      {
        <div className="cuadroGanaciasStaking">
          <div>BTCB</div>
          <div>{addr ? stackedByUser.toFixed(5) : null}</div>
          <div className="celeste">
            {addr ? (stackedByUser * 0.65).toFixed(3) + " USDT" : null}
          </div>
          <div className="celeste">
            <b>AMT depositados: </b>
            {addr && stakingIniciales
              ? stakingIniciales[addr?.toLowerCase()].amount
              : null}
          </div>
          <div className="celeste">
            <b>Data do depósito: </b>{" "}
            {addr && stakingIniciales
              ? formatDate(stakingIniciales[addr?.toLowerCase()].tstamp)
              : null}
          </div>
          <div className="celeste">
            <b>BTCB recebidos: </b>
            {addr && stakingIniciales
              ? (
                  stackedByUser - stakingIniciales[addr?.toLowerCase()].amount
                ).toFixed(5)
              : null}
          </div>
        </div>
      }
      {listaDeContainers}
    </div>
  );
};

export default Historico;
