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
};
function LineChart() {
  const [ingresosBurnVault, setIngresosBurnVault] = useState<ingresosType[]>(
    []
  );
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );

  const precioBtcEnUsdt = useSelector(
    (state: typeof RootState) => state.btcb.precioEnUsdt
  );

  const options = {
    responsive: true,
  };
  useEffect(() => {
    fetchBurnVaultTransfers().then((result) => {
      setIngresosBurnVault(result);
    });
  }, []);
  const ingresos = ingresosBurnVault.map((ingreso) =>
    formatter(ingreso.amount)
  );

  const labels = ingresosBurnVault.map(
    (ingreso) => ingreso.timestamp,
    toString()
  );

  let cumulativeSum = 0;
  const ingresosAcumulados = ingresosBurnVault.map((ingreso) => {
    cumulativeSum += formatter(ingreso.amount);
    return cumulativeSum;
  });

  const containers = (ingresos: ingresosType[]) => {
    const ingresosReversed = [...ingresos].reverse();

    return ingresosReversed.map((ingreso) => {
      if (formatter(ingreso.amount) > 0 && precioBtcEnUsdt) {
        const esDistribucion =
          ingreso.from == "0x0971d6f87fb3a30d512f09275b0c56922b0a304e";
        const valorBtcEnUsdt = precioBtcEnUsdt * formatter(ingreso.amount);
        return (
          <div className="cuadritosQuema">
            <img
              src={esDistribucion ? "iconDistribucion.png" : "iconGift.png"}
              alt=""
            />

            <div className="transparente">
              <p>
                <b>
                  {esDistribucion
                    ? textosExtra[currentLanguage].distribucionDiaria
                    : textosExtra[currentLanguage].aporteDelProjectoAmt}
                </b>
              </p>
              <p>{ingreso.timestamp}</p>
            </div>
            <div className="transparente">
              <b style={{ color: "#00ddff", justifyContent: "right" }}>
                {" "}
                + {formatter(ingreso.amount).toFixed(6)} BTC
              </b>
              <p style={{ justifyContent: "right" }}>
                ({valorBtcEnUsdt.toFixed(3)} USDT)
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
      {containers(ingresosBurnVault)}
    </>
  );
}

export default LineChart;
