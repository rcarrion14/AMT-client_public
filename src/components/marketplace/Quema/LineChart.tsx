import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { textosExtra } from "../../../Utils/textos";
import { fetchBurnVaultTransfers } from "../../../Utils/fetchBuckets";

import contractAddresses from "../../../contracts/contractAddresses";
import { toFrontEndString } from "../../../Utils/formatHelpers";
import { BigNumber } from "ethers";
import { ingresosType } from "../../../Utils/fetchBuckets";

function LineChart() {
  const [transferBurnVault, setTransferBurnVault] = useState<ingresosType[]>(
    []
  );
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const precioBtcEnUsdt = useSelector(
    (state: typeof RootState) => state.btcb.precioEnUsdt
  );

  const ratioBurnVault = useSelector(
    (state: typeof RootState) => state.burnVault.backRate
  );

  useEffect(() => {
    fetchBurnVaultTransfers().then((result) => {
      setTransferBurnVault(result);
    });
  }, []);

  const [pags, setPags] = useState(5);
  const transfers = transferBurnVault.map((transfer) => {
    if (transfer.from == contractAddresses.burnVault) {
      return -1 * parseFloat(transfer.amount.toString());
    } else {
      return transfer.amount;
    }
  });

  const labels = transferBurnVault.map(
    (transfer) => transfer.timestamp,
    toString()
  );

  let cumulativeSum = BigNumber.from(0);
  let cumulativeSumToShow = 0;

  const ingresosAcumulados = transfers.map((transfer) => {
    return (cumulativeSumToShow += parseFloat(
      toFrontEndString(BigNumber.from(transfer))
    ));
  });

  const containers = (transfers: ingresosType[]) => {
    return transfers.map((transfer) => {
      if (precioBtcEnUsdt) {
        // set condition to render boxes
        const esDistribucion =
          transfer.from == "0x0971d6f87fb3a30d512f09275b0c56922b0a304e";
        const esQuema =
          transfer.from == contractAddresses.burnVault.toLocaleLowerCase();
        if (esQuema) {
          let testDate = new Date(transfer.timestamp);
        }
        const valorBtcEnUsdt = transfer.amount.mul(precioBtcEnUsdt.toFixed(0));
        return (
          <div className="cuadroCobro">
            <img
              src={
                esQuema
                  ? "iconQuema.png"
                  : esDistribucion
                  ? "iconDistribucion.png"
                  : "iconGift.png"
              }
              alt=""
            />

            <div className="transparente">
              <p>
                <b>
                  {esQuema
                    ? textosExtra[currentLanguage].quemaDeAmt
                    : esDistribucion
                    ? textosExtra[currentLanguage].distribucionDiaria
                    : textosExtra[currentLanguage].aporteDelProjectoAmt}
                </b>
              </p>
              <p>{transfer.timestamp}</p>
            </div>
            <div className="transparente">
              <b
                style={
                  esQuema
                    ? { color: "red" }
                    : { color: "#00ddff", justifyContent: "right" }
                }
              >
                {esQuema && ratioBurnVault
                  ? "-" +
                    toFrontEndString(transfer.amount.mul(ratioBurnVault)) +
                    " AMT"
                  : "+" + toFrontEndString(transfer.amount) + " BTCB"}{" "}
              </b>
              <p style={{ justifyContent: "right" }}>
                {!esQuema
                  ? "(" + toFrontEndString(valorBtcEnUsdt, 3) + " USDT)"
                  : ""}
              </p>
            </div>
          </div>
        );
      } else {
        <></>;
      }
    });
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: textosExtra[currentLanguage].btcEnVault,
        data: ingresosAcumulados,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgb(0, 221, 255)",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20, // change this to your desired maximum number of ticks
        },
      },
    },
  };
  const transfersReversed = [...transferBurnVault].reverse();
  return (
    <>
      <div className="containerLineGraphQuema">
        <Line data={data} options={options} height={400}></Line>
      </div>

      {containers(transfersReversed.slice(0, pags))}
      <button
        className="btnLarge"
        onClick={() => {
          setPags(pags + 10);
        }}
      >
        {textosExtra[currentLanguage].sepaMas}
      </button>
    </>
  );
}

export default LineChart;
