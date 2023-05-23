import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { BigNumber, ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import { snapToDateMapp } from "../../gInvestidores/snapshotDateMapper";
import Spinner from "../../Generales/Spinner/Spinner";
import { fetchVaultAmt } from "../../../Utils/fetchBuckets";
import { textoBotonesBlancos, textosExtra } from "../../../Utils/textos";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import { dataStakingType, dataSwapsValue } from "../../../Utils/fetchBuckets";

interface HistoricoProps {
  setHistorico: React.Dispatch<React.SetStateAction<boolean>>;
  stackedByUser: ethers.BigNumber | undefined;
  contractAmt: ethers.Contract;
  currentSnapshot: number | undefined;
}
const Historico: React.FC<HistoricoProps> = ({
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

  const [stakingIniciales, setStakingIniciales] = useState<
    dataStakingType | undefined
  >(undefined);
  const [fechasSwaps, setFechasSwaps] = useState<dataSwapsValue[]>([]);
  const [balancesAt, setBalancesAt] = useState<BigNumber[]>([]);

  async function getAllSnapshotFrom(snapFrom: number): Promise<BigNumber[]> {
    let promiseList = [];
    if (currentSnapshot) {
      for (let i = snapFrom; i <= currentSnapshot; i++) {
        const promise = contractAmt.balanceOfAt(contractAddresses.VaultAmt, i);
        promiseList.push(promise);
      }
    }

    const balances = await Promise.all(promiseList);

    return balances;
  }

  function getGanancias(): Array<[ethers.BigNumber, number]> {
    if (stakingIniciales != undefined && addr != undefined) {
      let depositoInicial = ethers.BigNumber.from(
        stakingIniciales[addr].amount
      );
      var gananciaAt_i: Array<[ethers.BigNumber, number]> = [];
      var ultimaGananciaAcum = ethers.BigNumber.from(0);

      for (let i = 0; i < balancesAt.length; i++) {
        let balanceAt = balancesAt[i];
        let swapAt = ethers.BigNumber.from(
          fechasSwaps[fechasSwaps.length - balancesAt.length + i].amount
        );
        let snap = fechasSwaps[fechasSwaps.length - balancesAt.length + i].snap;

        let ganancia = depositoInicial
          .add(ultimaGananciaAcum)
          .mul(swapAt)
          .div(balanceAt);

        ultimaGananciaAcum = ultimaGananciaAcum.add(ganancia);

        gananciaAt_i.push([ganancia, snap]);
      }
      return gananciaAt_i.reverse();
    } else return [];
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
              <p>{toFrontEndString(ganancia[0])} AMT</p>
              <p>
                {precioAmtEnUsdt
                  ? toFrontEndString(
                      BigNumber.from(
                        (
                          parseFloat(ganancia[0].toString()) * precioAmtEnUsdt
                        ).toFixed(0)
                      )
                    )
                  : ""}{" "}
                USDT
              </p>
            </div>
          </div>
        );
      });
    } else {
    }
  };

  useEffect(() => {
    if (addr) {
      fetchVaultAmt().then((result) => {
        setStakingIniciales(result.dataStakings);
        setFechasSwaps(result.dataSwaps);
        getAllSnapshotFrom(result.dataStakings[addr].snap).then((result) => {
          setBalancesAt(result);
        });
      });
    }
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
        <div>{stackedByUser ? toFrontEndString(stackedByUser) : 0}</div>
        <div className="celeste">
          {stackedByUser && precioAmtEnUsdt
            ? (
                parseFloat(toFrontEndString(stackedByUser)) * precioAmtEnUsdt
              ).toFixed(4) + " USDT"
            : 0 + " USDT"}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].amtDepositados} </b>
          {stakingIniciales && stackedByUser
            ? toFrontEndString(stackedByUser)
            : null}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].amtDepositados}</b>{" "}
          {stakingIniciales && addr
            ? formatDate(stakingIniciales[addr].tstamp)
            : "-"}
        </div>
        <div className="celeste">
          <b>{textosExtra[currentLanguage].amtGenerados}</b>{" "}
          {stakingIniciales && addr && stackedByUser && stackedByUser.gt(0)
            ? toFrontEndString(
                stackedByUser.sub(
                  ethers.BigNumber.from(stakingIniciales[addr].amount)
                )
              )
            : "-"}
        </div>
      </div>
      {stakingIniciales && stackedByUser ? (
        stackedByUser.gt(0) ? (
          containers()
        ) : null
      ) : (
        <Spinner size={20} gradientColor={["#00bfdc", "#fff"]}></Spinner>
      )}
    </div>
  );
};

export default Historico;
