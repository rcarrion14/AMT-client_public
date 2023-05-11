// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchVaultBctb, formatDate } from "../../../Utils/fetchBuckets";
import contractAddresses from "../../../contracts/contractAddresses";
import { snapToDateMapp } from "../../gInvestidores/snapshotDateMapper";
import { ethers } from "ethers";
import { textoBotonesBlancos, textosExtra } from "../../../Utils/textos";

const Historico = ({
  setHistorico,
  stackedByUser,
  currentSnapshot,
  contractAmt,
}) => {
  const addr = useSelector((state: typeof RootState) => state.wallet.address);
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
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

    return balances;
  }

  function getGanancias() {
    let depositoInicial = ethers.BigNumber.from(stakingIniciales[addr].amount);
    var gananciaAt_i = [];
    let gananciaAcum = ethers.BigNumber.from(0);

    for (let i = 0; i < balancesAt.length; i++) {
      let balanceAt = balancesAt[i];

      let swapAt = ethers.BigNumber.from(
        dataCobros[dataCobros.length - balancesAt.length + i].amount
      );

      let snap = dataCobros[dataCobros.length - balancesAt.length + i].snap;

      console.log({ depositoInicial, balanceAt, swapAt });

      let ganancia = depositoInicial.mul(swapAt).div(balanceAt);

      gananciaAcum = gananciaAcum.add(ganancia);
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
                <b>{textosExtra[currentLanguage].gananciasDistribuidas}</b>
              </p>
              <p>{snapToDateMapp(ganancia[1])}</p>
            </div>
            <div className="transparente">
              <p>{ethers.utils.formatEther(ganancia[0])}</p>
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
        <h1>{textoBotonesBlancos[currentLanguage].staking.titulo}</h1>
      </div>

      <div className="cuadroGanaciasStaking">
        <div>AMT</div>
        <div>{addr ? ethers.utils.formatEther(stackedByUser) : null}</div>
        <div className="celeste">
          {addr ? ethers.utils.formatEther(stackedByUser) + " USDT" : null}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].amtDepositados}</b>
          {addr && stakingIniciales
            ? ethers.utils.formatEther(stakingIniciales[addr].amount)
            : null}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].dataDeDeposito}</b>{" "}
          {addr && stakingIniciales && stackedByUser > 0
            ? formatDate(stakingIniciales[addr].tstamp)
            : null}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].btcACobrar}</b>

          {addr && stakingIniciales && stackedByUser > 0
            ? ethers.utils.formatEther(getGanancias().gananciaAcum)
            : "oo"}
        </div>
      </div>

      {stackedByUser > 0 ? containers() : null}
    </div>
  );
};

export default Historico;
