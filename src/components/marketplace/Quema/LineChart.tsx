import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { textosExtra } from "../../../Utils/textos";
import { fetchBurnVaultTransfers } from "../../../Utils/fetchBuckets";
import { formatter } from "../../../store/features/formatter";
import { current } from "@reduxjs/toolkit";
import contractAddresses from "../../../contracts/contractAddresses";

type ingresosType = {
  from: any;
  amount: any;
  timestamp: any;
  to: any;
};
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

  const options = {
    responsive: true,
  };
  useEffect(() => {
    fetchBurnVaultTransfers().then((result) => {
      setTransferBurnVault(result);
    });
  }, []);
  const transfers = transferBurnVault.map((transfer) => {
    if (transfer.from == contractAddresses.burnVault) {
      -1 * formatter(transfer.amount);
    } else {
      formatter(transfer.amount);
    }
  });

  const labels = transferBurnVault.map(
    (transfer) => transfer.timestamp,
    toString()
  );

  let cumulativeSum = 0;
  const ingresosAcumulados = transferBurnVault.map((transfer) => {
    cumulativeSum += formatter(transfer.amount);
    return cumulativeSum;
  });

  const containers = (transfers: ingresosType[]) => {
    const transfersReversed = [...transfers].reverse();

    return transfersReversed.map((transfer) => {
      if (formatter(transfer.amount) > 0 && precioBtcEnUsdt) {
        const esDistribucion =
          transfer.from == "0x0971d6f87fb3a30d512f09275b0c56922b0a304e";
        const esQuema =
          transfer.from == contractAddresses.burnVault.toLocaleLowerCase();
        if (esQuema) {
          let testDate = new Date(transfer.timestamp);
        }
        const valorBtcEnUsdt = precioBtcEnUsdt * formatter(transfer.amount);
        return (
          <div className="cuadritosQuema">
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
                    parseFloat(
                      (formatter(transfer.amount) * ratioBurnVault).toString()
                    ).toFixed(6) +
                    " AMT"
                  : "+" + formatter(transfer.amount).toFixed(6) + " BTCB"}{" "}
              </b>
              <p style={{ justifyContent: "right" }}>
                {!esQuema ? "(" + valorBtcEnUsdt.toFixed(3) + "USDT)" : ""}
              </p>
            </div>
          </div>
        );
      } else {
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
        borderColor: "rgb(0, 221, 255)",
      },
    ],
  };
  return (
    <>
      <div>
        <Line data={data} options={options} />
      </div>
      {containers(transferBurnVault)}
    </>
  );
}

export default LineChart;
