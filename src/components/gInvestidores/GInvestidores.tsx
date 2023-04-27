import React, { useEffect } from "react";
import CuadroCobro from "./CuadroCobro";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { amtLoaders } from "../../store/features/amt/amtSlice";
import { masterLoaders } from "../../store/features/master/masterSlice";
import { useState } from "react";
import { masterOperations } from "../../store/features/master/masterOperations";
import { textoStaking } from "../../Utils/textos";
import Pagination from "./paginationComponent/pagination";

const GInvestidores = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentSnapshot = useSelector(
    (state: typeof RootState) => state.amt.currentSnapshot
  );
  const [readingSnapshot, setReadingSnapshot] = useState<number | undefined>(
    undefined
  ); //Datos del componente
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

  const alreadyCharged1 = useSelector(
    (state: typeof RootState) => state.master.alreadyCharged1
  );
  const alreadyCharged2 = useSelector(
    (state: typeof RootState) => state.master.alreadyCharged2
  );
  const alreadyCharged3 = useSelector(
    (state: typeof RootState) => state.master.alreadyCharged3
  );
  const alreadyCharged4 = useSelector(
    (state: typeof RootState) => state.master.alreadyCharged4
  );
  const alreadyCharged5 = useSelector(
    (state: typeof RootState) => state.master.alreadyCharged5
  );

  return (
    <>
      {textoStaking("por")}
      <CuadroCobro
        balanceOfAt={balanceOfAt1}
        payAt={pays1}
        totalSupplyAt={TotalSupplyAt1}
        currentSnap={readingSnapshot ? readingSnapshot : 0}
        alreadyCharged={alreadyCharged1}
        charge={() => {
          readingSnapshot
            ? masterOperations.charge(
                dispatch,
                readingSnapshot,
                readingSnapshot
              )
            : console.log("notloaded");
        }}
      />
      <CuadroCobro
        balanceOfAt={balanceOfAt2}
        payAt={pays2}
        totalSupplyAt={TotalSupplyAt2}
        currentSnap={readingSnapshot ? readingSnapshot - 1 : 0}
        alreadyCharged={alreadyCharged2}
        charge={() => {
          readingSnapshot
            ? masterOperations.charge(
                dispatch,
                readingSnapshot - 1,
                readingSnapshot
              )
            : console.log("notloaded");
        }}
      />
      <CuadroCobro
        balanceOfAt={balanceOfAt3}
        payAt={pays3}
        totalSupplyAt={TotalSupplyAt3}
        currentSnap={readingSnapshot ? readingSnapshot - 2 : 0}
        alreadyCharged={alreadyCharged3}
        charge={() => {
          readingSnapshot
            ? masterOperations.charge(
                dispatch,
                readingSnapshot - 2,
                readingSnapshot
              )
            : console.log("notloaded");
        }}
      />
      <CuadroCobro
        balanceOfAt={balanceOfAt4}
        payAt={pays4}
        totalSupplyAt={TotalSupplyAt4}
        currentSnap={readingSnapshot ? readingSnapshot - 3 : 0}
        alreadyCharged={alreadyCharged4}
        charge={() => {
          readingSnapshot
            ? masterOperations.charge(
                dispatch,
                readingSnapshot - 3,
                readingSnapshot
              )
            : console.log("notloaded");
        }}
      />
      <CuadroCobro
        balanceOfAt={balanceOfAt5}
        payAt={pays5}
        totalSupplyAt={TotalSupplyAt5}
        currentSnap={readingSnapshot ? readingSnapshot - 4 : 0}
        alreadyCharged={alreadyCharged5}
        charge={() => {
          readingSnapshot
            ? masterOperations.charge(
                dispatch,
                readingSnapshot - 4,
                readingSnapshot
              )
            : console.log("notloaded");
        }}
      />
      <div>
        <Pagination
          itemsPerPage={5}
          totalItems={currentSnapshot}
          paginate={(pageNumber: number) => {
            setReadingSnapshot(currentSnapshot - 5 * (pageNumber - 1));
            amtLoaders.loaderWithSnapshots(
              dispatch,
              currentSnapshot - 5 * (pageNumber - 1)
            );
            masterLoaders.generalLoad(
              dispatch,
              currentSnapshot - 5 * (pageNumber - 1)
            );
          }}
        ></Pagination>
      </div>
    </>
  );
};

export default GInvestidores;
