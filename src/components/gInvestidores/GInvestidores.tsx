import React, { useEffect } from "react";
import CuadroCobro from "./CuadroCobro";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { amtLoaders } from "../../store/features/amt/amtSlice";
import { masterLoaders } from "../../store/features/master/masterSlice";
import { useState } from "react";
const GInvestidores = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentSnapshot = useSelector(
    (state: typeof RootState) => state.amt.currentSnapshot
  );
  const [readingSnapshot, setReadingSnapshot] = useState<string | null>(null); //Datos del componente
  useEffect(() => {
    setReadingSnapshot(currentSnapshot);
  }, []);

  //Balances of at
  const balanceOfAt1 = useSelector(
    (state: typeof RootState) => state.amt.balanceOfAt1
  );
  const balanceOfAt2 = useSelector(
    (state: typeof RootState) => state.amt.balanceOfAt2
  );
  const balanceOfAt3 = useSelector(
    (state: typeof RootState) => state.amt.balanceOfAt3
  );
  const balanceOfAt4 = useSelector(
    (state: typeof RootState) => state.amt.balanceOfAt4
  );
  const balanceOfAt5 = useSelector(
    (state: typeof RootState) => state.amt.balanceOfAt5
  );

  //Pagos at
  const pays1 = useSelector((state: typeof RootState) => state.master.pays1);
  const pays2 = useSelector((state: typeof RootState) => state.master.pays2);
  const pays3 = useSelector((state: typeof RootState) => state.master.pays3);
  const pays4 = useSelector((state: typeof RootState) => state.master.pays4);
  const pays5 = useSelector((state: typeof RootState) => state.master.pays5);

  //TotalSupplyAt
  const TotalSupplyAt1 = useSelector(
    (state: typeof RootState) => state.amt.totalSupplyAt1
  );
  const TotalSupplyAt2 = useSelector(
    (state: typeof RootState) => state.amt.totalSupplyAt2
  );
  const TotalSupplyAt3 = useSelector(
    (state: typeof RootState) => state.amt.totalSupplyAt3
  );
  const TotalSupplyAt4 = useSelector(
    (state: typeof RootState) => state.amt.totalSupplyAt4
  );
  const TotalSupplyAt5 = useSelector(
    (state: typeof RootState) => state.amt.totalSupplyAt5
  );

  return (
    <>
      <h1>Grandes investidores</h1>

      <p>
        Esta página é destinada aos investidores que preferem pagar a taxa de
        gás diariamente, mas manter seus tokens em sua Metamask.
      </p>
      <p>
        Por isso, não recomendamos aos pequenos investidores, isto é, para que
        ao corram o risco de prejudicar a sua rentabilidade tendo que pagar
        taxas.
      </p>
      <p>
        Aos investidores que não desejam pagar a taxas diária, mas sim acumular
        rendimentos em Bitcoin todos os dias, de forma automática, nós
        recomendamos que coloque seus tokens em staking.
        <u>Clique aqui e veja suas opções.</u>
      </p>
      <CuadroCobro
        balanceOfAt={balanceOfAt1}
        payAt={pays1}
        totalSupplyAt={TotalSupplyAt1}
        currentSnap={readingSnapshot ? parseInt(readingSnapshot) : 0}
      />
      <CuadroCobro
        balanceOfAt={balanceOfAt2}
        payAt={pays2}
        totalSupplyAt={TotalSupplyAt2}
        currentSnap={readingSnapshot ? parseInt(readingSnapshot) - 1 : 0}
      />
      <CuadroCobro
        balanceOfAt={balanceOfAt3}
        payAt={pays3}
        totalSupplyAt={TotalSupplyAt3}
        currentSnap={readingSnapshot ? parseInt(readingSnapshot) - 2 : 0}
      />
      <CuadroCobro
        balanceOfAt={balanceOfAt4}
        payAt={pays4}
        totalSupplyAt={TotalSupplyAt4}
        currentSnap={readingSnapshot ? parseInt(readingSnapshot) - 3 : 0}
      />
      <CuadroCobro
        balanceOfAt={balanceOfAt5}
        payAt={pays5}
        totalSupplyAt={TotalSupplyAt5}
        currentSnap={readingSnapshot ? parseInt(readingSnapshot) - 4 : 0}
      />

      {/* Arrow button */}
      <button
        onClick={() => {
          setReadingSnapshot((parseInt(readingSnapshot) + 5).toString());
          amtLoaders.loaderWithSnapshots(
            dispatch,
            parseInt(readingSnapshot) + 5
          );
          masterLoaders.generalLoad(dispatch, parseInt(readingSnapshot) + 5);
        }}
      >
        {"<="}{" "}
      </button>
      <button
        onClick={() => {
          setReadingSnapshot((parseInt(readingSnapshot) - 5).toString());
          amtLoaders.loaderWithSnapshots(
            dispatch,
            parseInt(readingSnapshot) - 5
          );
          masterLoaders.generalLoad(dispatch, parseInt(readingSnapshot) - 5);
        }}
      >
        {"=>"}{" "}
      </button>
    </>
  );
};

export default GInvestidores;
