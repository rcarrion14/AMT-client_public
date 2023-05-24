import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchVaultBctb, formatDate } from "../../../Utils/fetchBuckets";
import contractAddresses from "../../../contracts/contractAddresses";
import { snapToDateMapp } from "../../gInvestidores/snapshotDateMapper";
import { ethers, BigNumber } from "ethers";
import { textoBotonesBlancos, textosExtra } from "../../../Utils/textos";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import { dataStakingType, dataCobrosValue } from "../../../Utils/fetchBuckets";
interface HistoricoProps {
  setHistorico: React.Dispatch<React.SetStateAction<boolean>>;
  stackedByUser: BigNumber | undefined;
  contractAmt: ethers.Contract;
  currentSnapshot: number | undefined;
}
const Historico: React.FC<HistoricoProps> = ({
  setHistorico,
  stackedByUser,
  currentSnapshot,
  contractAmt,
}) => {
  const addr = useSelector((state: typeof RootState) => state.wallet.address);
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const precioAmtUsdt = useSelector(
    (state: typeof RootState) => state.amt.precioEnUsdt
  );
  const [stakingIniciales, setStakingIniciales] = useState<
    dataStakingType | undefined
  >(undefined);
  const [dataCobros, setDataCobros] = useState<dataCobrosValue[]>([]);
  const [balancesAt, setBalancesAt] = useState<number[]>([]);

  async function getAllSnapshotFrom(snapFrom: number): Promise<number[]> {
    let promiseList = [];
    if (currentSnapshot) {
      for (let i = snapFrom; i <= currentSnapshot; i++) {
        const promise = contractAmt.balanceOfAt(contractAddresses.VaultBtcb, i);
        promiseList.push(promise);
      }
    }

    const balances = await Promise.all(promiseList);

    return balances;
  }

  function getGanancias(): {
    gananciaAt_i: [ethers.BigNumber, number][];
    gananciaAcum: ethers.BigNumber;
  } {
    var gananciaAt_i: Array<[ethers.BigNumber, number]> = [];
    let gananciaAcum = ethers.BigNumber.from(0);
    if (stakingIniciales != undefined && addr != undefined) {
      let depositoInicial = ethers.BigNumber.from(
        stakingIniciales[addr].amount
      );

      for (let i = 0; i < balancesAt.length; i++) {
        let balanceAt = balancesAt[i];

        let swapAt = ethers.BigNumber.from(
          dataCobros[dataCobros.length - balancesAt.length + i].amount
        );

        let snap = dataCobros[dataCobros.length - balancesAt.length + i].snap;

        let ganancia = depositoInicial.mul(swapAt).div(balanceAt);

        gananciaAcum = gananciaAcum.add(ganancia);
        gananciaAt_i.push([ganancia, snap]);
      }
      gananciaAt_i = gananciaAt_i.reverse();
    }

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
              {
                //Check next line if balances are showed correctly
              }
              <p>{toFrontEndString(ganancia[0], 7)}</p>
              <p>BTCB</p>
            </div>
          </div>
        );
      });
    } else {
    }
  };

  useEffect(() => {
    if (addr) {
      fetchVaultBctb().then((result) => {
        setStakingIniciales(result.dataStakings);
        setDataCobros(result.dataCobros);
        getAllSnapshotFrom(result.dataStakings[addr].snap + 1).then(
          (result) => {
            setBalancesAt(result);
          }
        );
      });
    }
  }, []);

  return (
    <div className="containerSlide">
      <div className="navBar_top">
        <img onClick={() => setHistorico(false)} src="icon_nav.png" />
        <h1>{textoBotonesBlancos[currentLanguage].staking.titulo}</h1>
      </div>

      <div className="cuadroGanaciasStaking">
        <div>AMT</div>
        <div>{stackedByUser ? toFrontEndString(stackedByUser) : null}</div>
        <div className="celeste">
          {stackedByUser && precioAmtUsdt
            ? (
                parseFloat(toFrontEndString(stackedByUser)) * precioAmtUsdt
              ).toFixed(4) + " USDT"
            : null}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].amtDepositados}</b>{" "}
          {addr && stakingIniciales
            ? toFrontEndString(BigNumber.from(stakingIniciales[addr].amount))
            : null}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].dataDeDeposito}</b>{" "}
          {stackedByUser && addr && stakingIniciales && stackedByUser.gt(0)
            ? formatDate(stakingIniciales[addr].tstamp)
            : null}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].btcACobrar}</b>{" "}
          {addr && stakingIniciales && stackedByUser?.gt(0)
            ? toFrontEndString(getGanancias().gananciaAcum)
            : "0"}
        </div>
      </div>

      {stackedByUser?.gt(0) ? containers() : null}
    </div>
  );
};

export default Historico;
