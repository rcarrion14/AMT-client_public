// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import { snapToDateMapp } from "../../gInvestidores/snapshotDateMapper";
import Spinner from "../../Generales/Spinner/Spinner";

const Historico = ({
  setHistorico,
  stackedByUser,
  contractAmt,
  currentSnapshot,
}) => {
  const addr = useSelector((state: typeof RootState) => state.wallet.address);

  const [stakingIniciales, setStakingIniciales] = useState(undefined);
  const [fechasSwaps, setFechasSwaps] = useState([]);
  const [balancesAt, setBalancesAt] = useState([]);

  async function getAllSnapshotFrom(snapFrom: number) {
    let promiseList = [];

    for (let i = snapFrom; i <= currentSnapshot; i++) {
      const promise = contractAmt.balanceOfAt(contractAddresses.VaultAmt, i);
      promiseList.push(promise);
    }
    const balances = await Promise.all(promiseList);
    let balanceDecimal = [];
    balances.map((hex) => {
      balanceDecimal.push(ethers.utils.formatEther(hex));
    });
    return balanceDecimal;
  }

  function getGanancias() {
    let depositoInicial = parseFloat(stakingIniciales[addr].amount);
    var gananciaAt_i = [];
    var gananciaAcum = [0];
    var snapsList = [];
    var ultimaGananciaAcum = 0;
    for (let i = 0; i < balancesAt.length; i++) {
      let balanceAt = parseFloat(balancesAt[i]);
      let swapAt = parseFloat(
        fechasSwaps[fechasSwaps.length - balancesAt.length + i].amount
      );
      let snap = fechasSwaps[fechasSwaps.length - balancesAt.length + i].snap;

      let ganancia =
        ((depositoInicial + ultimaGananciaAcum) / balanceAt) * swapAt;
      console.log(ganancia);

      ultimaGananciaAcum = ultimaGananciaAcum + ganancia;

      gananciaAcum.push(ultimaGananciaAcum);
      gananciaAt_i.push([ganancia, snap]);
    }
    return gananciaAt_i.reverse();
  }

  const containersCoso = () => {
    if (stakingIniciales) {
      const listaGanancias = getGanancias();

      return listaGanancias.map((ganancia) => {
        return (
          <div className="cuadroStakings">
            <img className="activeIcon" src="arrow-down.png" alt="" />

            <div className="transparente">
              <p>
                <b>Autocompra de AMT</b>
              </p>
              <p>{snapToDateMapp(ganancia[1])}</p>
            </div>
            <div className="transparente">
              <p>{ganancia[0].toFixed(6)}</p>
              <p>XX BTC</p>
            </div>
          </div>
        );
      });
    } else {
    }
  };

  useEffect(() => {
    async function fetchData() {
      const responseStakings = await fetch(
        "https://amt-bucket-aws.s3.amazonaws.com/ultimosStaking.json"
      );
      const dataStakings = await responseStakings.json();

      const responseFechasSwaps = await fetch(
        "https://amt-bucket-aws.s3.amazonaws.com/fechasSwaps.json"
      );
      const dataFechasSwaps = await responseFechasSwaps.json();

      return { dataStakings, dataFechasSwaps };
    }

    fetchData().then((result) => {
      setStakingIniciales(result.dataStakings);
      setFechasSwaps(result.dataFechasSwaps);
      getAllSnapshotFrom(result.dataStakings[addr].snap).then((result) => {
        setBalancesAt(result);
      });
    });
  }, []);

  const formatDate = (timestamp: number) => {
    let newDate = new Date(timestamp);
    let date = newDate.toLocaleDateString();
    return date;
  };

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setHistorico(false)} src="icon_nav.png" />
        <h1>Staking Autocompra</h1>
      </div>

      <div className="cuadroGanaciasStaking">
        <div>AMT</div>
        <div>{addr ? stackedByUser.toFixed(5) : null}</div>
        <div className="celeste">
          {addr ? (stackedByUser * 0.65).toFixed(3) + " USDT" : null}
        </div>
        <div className="celeste">
          <b>AMT depositados: </b>
          {addr && stakingIniciales ? stakingIniciales[addr].amount : null}
        </div>
        <div className="celeste">
          <b>Data do depósito: </b>{" "}
          {addr && stakingIniciales
            ? formatDate(stakingIniciales[addr].tstamp)
            : null}
        </div>
        <div className="celeste">
          <b>BTCB recebidos: </b>
          {addr && stakingIniciales
            ? (stackedByUser - stakingIniciales[addr].amount).toFixed(5)
            : null}
        </div>
      </div>

      {containersCoso()}
    </div>
  );
};

export default Historico;
