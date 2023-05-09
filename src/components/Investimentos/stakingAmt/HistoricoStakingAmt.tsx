// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import { snapToDateMapp } from "../../gInvestidores/snapshotDateMapper";
import Spinner from "../../Generales/Spinner/Spinner";
import { fetchVaultAmt } from "../../../Utils/fetchBuckets";
import { textoBotonesBlancos, textosExtra } from "../../../Utils/textos";
import { current } from "@reduxjs/toolkit";

const Historico = ({
  setHistorico,
  stackedByUser,
  contractAmt,
  currentSnapshot,
}) => {
  const addr = useSelector((state: typeof RootState) => state.wallet.address);
  const precioAmtEnUsdt = useSelector(
    (state: typeof RootState) => state.amt.precioEnUsdt
  );
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
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

      gananciaAt_i.push([ganancia, snap]);
    }
    return gananciaAt_i.reverse();
  }

  const containers = () => {
    if (stakingIniciales) {
      const listaGanancias = getGanancias();

      return listaGanancias.map((ganancia) => {
        return (
          <div className="cuadroStakings">
            <img className="activeIcon" src="arrow-down.png" alt="" />

            <div className="transparente">
              <p>
                <b>{textosExtra[currentLanguage].amtGenerados}</b>
              </p>
              <p>{snapToDateMapp(ganancia[1])}</p>
            </div>
            <div className="transparente">
              <p>{ganancia[0].toFixed(6)}</p>
              <p>AMT</p>
            </div>
          </div>
        );
      });
    } else {
    }
  };

  useEffect(() => {
    fetchVaultAmt().then((result) => {
      setStakingIniciales(result.dataStakings);
      setFechasSwaps(result.dataSwaps);
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
        <h1>{textoBotonesBlancos[currentLanguage].stakingAmt.titulo}</h1>
      </div>

      <div className="cuadroGanaciasStaking">
        <div>AMT</div>
        <div>{stackedByUser ? stackedByUser.toFixed(5) : 0}</div>
        <div className="celeste">
          {stackedByUser
            ? (stackedByUser * precioAmtEnUsdt).toFixed(3) + " USDT"
            : 0 + " USDT"}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].amtDepositados} </b>
          {stakingIniciales ? stackedByUser : null}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].dataDeDeposito} </b>{" "}
          {stakingIniciales
            ? stackedByUser > 0
              ? formatDate(stakingIniciales[addr].tstamp)
              : "-"
            : "-"}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].amtGenerados}</b>
          {stakingIniciales
            ? stackedByUser > 0
              ? (stackedByUser - stakingIniciales[addr].amount).toFixed(5)
              : "-"
            : "-"}
        </div>
      </div>

      {stackedByUser > 0 ? containers() : null}
    </div>
  );
};

export default Historico;
