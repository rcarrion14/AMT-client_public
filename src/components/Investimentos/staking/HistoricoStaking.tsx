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

    for (let i = 0; i < balancesAt.length; i++) {
      let balanceAt = parseFloat(balancesAt[i]);
      let swapAt = parseFloat(
        dataCobros[dataCobros.length - balancesAt.length + i].amount
      );
      let snap = dataCobros[dataCobros.length - balancesAt.length + i].snap;

      let ganancia = (depositoInicial / balanceAt) * swapAt;

      gananciaAt_i.push([ganancia, snap]);
    }
    console.log(gananciaAt_i);

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
                <b>Lucros distribuidos</b>
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
      {containers()}
    </div>
  );
};

export default Historico;
