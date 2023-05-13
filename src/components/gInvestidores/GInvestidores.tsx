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
import { textoGInvestidores } from "../../Utils/textos";
import { ethers } from "ethers";
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

  const liqPay1 = useSelector(
    (state: typeof RootState) => state.master.liqPays1
  );
  const liqPay2 = useSelector(
    (state: typeof RootState) => state.master.liqPays2
  );
  const liqPay3 = useSelector(
    (state: typeof RootState) => state.master.liqPays3
  );
  const liqPay4 = useSelector(
    (state: typeof RootState) => state.master.liqPays4
  );
  const liqPay5 = useSelector(
    (state: typeof RootState) => state.master.liqPays5
  );
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
  const currentLanguage = useSelector(
    (state: typeof RootState) => state.session.language
  );
  const allValuesDefined =
    alreadyCharged1 != undefined &&
    alreadyCharged2 != undefined &&
    alreadyCharged3 != undefined &&
    alreadyCharged4 != undefined &&
    alreadyCharged5 != undefined &&
    TotalSupplyAt1 != undefined &&
    TotalSupplyAt2 != undefined &&
    TotalSupplyAt3 != undefined &&
    TotalSupplyAt4 != undefined &&
    TotalSupplyAt5 != undefined &&
    liqPay1 &&
    liqPay2 &&
    liqPay3 &&
    liqPay4 &&
    liqPay5 &&
    pays1 &&
    pays2 &&
    pays3 &&
    pays4 &&
    pays5;
  return (
    <>
      <div className="containerLengueta">
        {textoGInvestidores(currentLanguage)}
        <CuadroCobro
          balanceOfAt={balanceOfAt1}
          payAt={pays1 && liqPay1 ? pays1.add(liqPay1) : undefined}
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
          payAt={pays2 && liqPay2 ? pays2.add(liqPay2) : undefined}
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
          payAt={pays3 && liqPay3 ? pays3.add(liqPay3) : undefined}
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
          payAt={pays4 && liqPay4 ? pays4.add(liqPay4) : undefined}
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
          payAt={pays5 && liqPay5 ? pays5.add(liqPay5) : undefined}
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
            paginate={
              currentSnapshot
                ? (pageNumber: number) => {
                    setReadingSnapshot(currentSnapshot - 5 * (pageNumber - 1));
                    amtLoaders.loaderWithSnapshots(
                      dispatch,
                      currentSnapshot - 5 * (pageNumber - 1)
                    );
                    masterLoaders.generalLoad(
                      dispatch,
                      currentSnapshot - 5 * (pageNumber - 1)
                    );
                  }
                : () => {}
            }
            paginationDisabled={!allValuesDefined}
          ></Pagination>
        </div>
      </div>
    </>
  );
};

export default GInvestidores;
