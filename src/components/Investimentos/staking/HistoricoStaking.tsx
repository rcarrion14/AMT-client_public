// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchVaultBctb, formatDate } from "../../../Utils/fetchBuckets";
import contractAddresses from "../../../contracts/contractAddresses";
import { snapToDateMapp } from "../../gInvestidores/snapshotDateMapper";
import { ethers } from "ethers";

const Historico = ({
  setHistorico,
  stackedByUser,
  currentSnapshot,
  contractAmt,
}) => {
  const addr = useSelector((state: typeof RootState) => state.wallet.address);
  const [stakingIniciales, setStakingIniciales] = useState(undefined);
  const [dataCobros, setDataCobros] = useState([]);
  const [balancesAt, setBalancesAt] = useState([]);

  async function getAllSnapshotFrom(snapFrom: number) {
    let promiseList = [];

    for (let i = snapFrom; i <= currentSnapshot; i++) {
      const promise = contractAmt.balanceOfAt(contractAddresses.VaultBtcb, i);
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
    let gananciaAcum = 0;

    for (let i = 0; i < balancesAt.length; i++) {
      let balanceAt = parseFloat(balancesAt[i]);
      let swapAt = parseFloat(
        dataCobros[dataCobros.length - balancesAt.length + i].amount
      );
      let snap = dataCobros[dataCobros.length - balancesAt.length + i].snap;

      let ganancia = (depositoInicial / balanceAt) * swapAt;
      gananciaAcum = gananciaAcum + ganancia;

      gananciaAt_i.push([ganancia, snap]);
    }
    gananciaAt_i = gananciaAt_i.reverse();

    return { gananciaAt_i, gananciaAcum };
  }

  const containers = () => {
    if (stakingIniciales) {
      const listaGanancias = getGanancias().gananciaAt_i;

      return listaGanancias.map((ganancia) => {
        return (
          <div className="cuadroStakings">
            <img className="activeIcon" src="arrow-down.png" alt="" />

            <div className="transparente">
              <p>
                <b>Lucros distribuidos</b>
              </p>
              <p>{snapToDateMapp(ganancia[1])}</p>
            </div>
            <div className="transparente">
              <p>{ganancia[0].toFixed(6)}</p>
              <p>BTCB</p>
            </div>
          </div>
        );
      });
    } else {
    }
  };

  useEffect(() => {
    fetchVaultBctb().then((result) => {
      setStakingIniciales(result.dataStakings);
      setDataCobros(result.dataCobros);
      getAllSnapshotFrom(result.dataStakings[addr].snap).then((result) => {
        setBalancesAt(result);
      });
    });
  }, []);

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setHistorico(false)} src="icon_nav.png" />
        <h1>Staking Padrao</h1>
      </div>

      <div className="cuadroGanaciasStaking">
        <div>AMT</div>
        <div>{addr ? stackedByUser.toFixed(2) : null}</div>
        <div className="celeste">
          {addr ? (stackedByUser * 0.65).toFixed(3) + " USDT" : null}
        </div>
        <div className="celeste">
          <b>AMT depositados: </b>
          {addr && stakingIniciales
            ? Number(stakingIniciales[addr].amount).toFixed(2)
            : null}
        </div>
        <div className="celeste">
          <b>Data do depósito: </b>{" "}
          {addr && stakingIniciales && stackedByUser > 0
            ? formatDate(stakingIniciales[addr].tstamp)
            : null}
        </div>
        <div className="celeste">
          <b>BTCB recebidos: </b>

          {addr && stakingIniciales && stackedByUser > 0
            ? getGanancias().gananciaAcum
            : 0}
        </div>
      </div>

      {stackedByUser > 0 ? containers() : null}
    </div>
  );
};

export default Historico;
