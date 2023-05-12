// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiAmt from "../../../contracts/abis/amt.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";
import { getPrecioEnUsdt as getPrecioEnUsdtOfBtc } from "../btcb/btcbSlice";

export interface amtState {
  contract: any | undefined;
  balance: number | undefined;
  allowanceMarket: number | undefined;
  allowanceBurnVault: number | undefined;
  allowanceVaultAmt: number | undefined;
  allowanceVaultBtcb: number | undefined;
  allowanceVaultBtcbLiq: number | undefined;
  allowanceMaster: number | undefined;
  currentSnapshot: number | undefined;
  balanceOfPool: number | undefined;
  totalSupply: number | undefined;

  balanceOfMarket: number | undefined;

  balanceOfAt1: number | undefined;
  balanceOfAt2: number | undefined;
  balanceOfAt3: number | undefined;
  balanceOfAt4: number | undefined;
  balanceOfAt5: number | undefined;

  totalSupplyAt1: number | undefined;
  totalSupplyAt2: number | undefined;
  totalSupplyAt3: number | undefined;
  totalSupplyAt4: number | undefined;
  totalSupplyAt5: number | undefined;

  balanceOfPoolAt1: number | undefined;
  balanceOfPoolAt2: number | undefined;
  balanceOfPoolAt3: number | undefined;
  balanceOfPoolAt4: number | undefined;
  balanceOfPoolAt5: number | undefined;

  precioEnBtc: number | undefined;
  precioEnUsdt: number | undefined;
}

const initialState: amtState = {
  contract: undefined,
  balance: undefined,
  precioEnBtc: undefined,
  precioEnUsdt: undefined,
  allowanceMarket: undefined,
  allowanceBurnVault: undefined,
  allowanceVaultAmt: undefined,
  allowanceVaultBtcb: undefined,
  allowanceVaultBtcbLiq: undefined,
  allowanceMaster: undefined,
  currentSnapshot: undefined,
  balanceOfPool: undefined,
  totalSupply: undefined,

  balanceOfMarket: undefined,
  balanceOfAt1: undefined,
  balanceOfAt2: undefined,
  balanceOfAt3: undefined,
  balanceOfAt4: undefined,
  balanceOfAt5: undefined,

  totalSupplyAt1: undefined,
  totalSupplyAt2: undefined,
  totalSupplyAt3: undefined,
  totalSupplyAt4: undefined,
  totalSupplyAt5: undefined,

  balanceOfPoolAt1: undefined,
  balanceOfPoolAt2: undefined,
  balanceOfPoolAt3: undefined,
  balanceOfPoolAt4: undefined,
  balanceOfPoolAt5: undefined,
};

export const createContract = createAsyncThunk(
  "amt/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.Amt,
        abiAmt,
        signer
      );
      return { newContract };
    } else return null;
  }
);

export const getAmtbalance = createAsyncThunk("amt/getAmtbalance", async () => {
  const staticState = getStaticState();
  const contract = staticState.amt.contract;
  const address = staticState.wallet.address;
  if (contract) {
    const newBalance = formatter(await contract.balanceOf(address));

    return { newBalance };
  } else return undefined;
});
export const getAllowanceMarket = createAsyncThunk(
  "amt/getAllowanceMarket",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.marketPlace)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getPrecioEnBtc = createAsyncThunk(
  "amt/getPrecioEnBtc",
  async () => {
    const staticState = getStaticState();
    const contractBtcb = staticState.btcb.contract;
    const contractAmt = staticState.amt.contract;
    if (contractAmt && contractBtcb) {
      const poolAddres = contractAddresses.LiqPool;
      //Servira formatter para calcular este precio?
      const balanceBtcb = formatter(await contractBtcb.balanceOf(poolAddres));
      const balanceAmt = formatter(await contractAmt.balanceOf(poolAddres));
      const precio = balanceBtcb / balanceAmt;
      return { precio };
    }
  }
);

export const getPrecioEnUsdt = createAsyncThunk(
  "amt/getPrecioEnUsdt",
  async () => {
    const staticState = getStaticState();
    const precioAmtEnBtcb = staticState.amt.precioEnBtc;
    const precioBtcEnUsdt = staticState.btcb.precioEnUsdt;
    //while (precioAmtEnBtcb == undefined || precioBtcEnUsdt == undefined) {}
    if (precioAmtEnBtcb && precioBtcEnUsdt) {
      const precio = precioAmtEnBtcb * precioBtcEnUsdt;
      return { precio };
    }
  }
);

export const getAllowanceBurnVault = createAsyncThunk(
  "amt/getAllowanceBurnVault",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.burnVault)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getAllowanceVaultAmt = createAsyncThunk(
  "amt/getAllowanceVaultAmt",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultAmt)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getAllowanceVaultBtcb = createAsyncThunk(
  "amt/getAllowanceVaultBtcb",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultBtcb)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getAllowanceVaultBtcbLiq = createAsyncThunk(
  "amt/getAllowanceVaultBtcbLiq",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultBtcbLiq)
      );
      return { newAllowance };
    } else return undefined;
  }
);
export const getAllowanceMaster = createAsyncThunk(
  "amt/getAllowanceMaster",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.Master)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getCurrentSnapshotId = createAsyncThunk(
  "amt/getCurrentSnapshotId",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const newCurrentSnapshotId = parseInt(
        await contract.getCurrentSnapshotId()
      );
      return { newCurrentSnapshotId };
    } else return undefined;
  }
);

export const getTotalSupply = createAsyncThunk(
  "amt/getTotalSupply",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const newTotalSupply = formatter(await contract.totalSupply());
      return { newTotalSupply };
    } else return undefined;
  }
);

export const getBalanceOfPool = createAsyncThunk(
  "amt/getBalanceOfPool",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const newBalanceOfPool = formatter(
        await contract.balanceOf(contractAddresses.LiqPool)
      );
      return { newBalanceOfPool };
    } else return undefined;
  }
);

export const getBalanceOfAt = createAsyncThunk(
  "amt/getBalanceOfAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const balanceOfAt1 = formatter(
        await contract.balanceOfAt(address, snapshot)
      );
      const balanceOfAt2 = formatter(
        await contract.balanceOfAt(address, snapshot - 1)
      );
      const balanceOfAt3 = formatter(
        await contract.balanceOfAt(address, snapshot - 2)
      );
      const balanceOfAt4 = formatter(
        await contract.balanceOfAt(address, snapshot - 3)
      );
      const balanceOfAt5 = formatter(
        await contract.balanceOfAt(address, snapshot - 4)
      );

      return {
        balanceOfAt1,
        balanceOfAt2,
        balanceOfAt3,
        balanceOfAt4,
        balanceOfAt5,
      };
    } else return undefined;
  }
);

export const getTotalSupplyAt = createAsyncThunk(
  "amt/getTotalSupplyAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const totalSupplyAt1 = formatter(await contract.totalSupplyAt(snapshot));
      const totalSupplyAt2 = formatter(
        await contract.totalSupplyAt(snapshot - 1)
      );
      const totalSupplyAt3 = formatter(
        await contract.totalSupplyAt(snapshot - 2)
      );
      const totalSupplyAt4 = formatter(
        await contract.totalSupplyAt(snapshot - 3)
      );
      const totalSupplyAt5 = formatter(
        await contract.totalSupplyAt(snapshot - 4)
      );

      return {
        totalSupplyAt1,
        totalSupplyAt2,
        totalSupplyAt3,
        totalSupplyAt4,
        totalSupplyAt5,
      };
    } else return undefined;
  }
);

export const getBalanceOfPoolAt = createAsyncThunk(
  "amt/getBalanceOfPoolAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = contractAddresses.LiqPool;

    if (contract) {
      const balanceOfAt1 = formatter(
        await contract.balanceOfAt(address, snapshot)
      );
      const balanceOfAt2 = formatter(
        await contract.balanceOfAt(address, snapshot - 1)
      );
      const balanceOfAt3 = formatter(
        await contract.balanceOfAt(address, snapshot - 2)
      );
      const balanceOfAt4 = formatter(
        await contract.balanceOfAt(address, snapshot - 3)
      );
      const balanceOfAt5 = formatter(
        await contract.balanceOfAt(address, snapshot - 4)
      );

      return {
        balanceOfAt1,
        balanceOfAt2,
        balanceOfAt3,
        balanceOfAt4,
        balanceOfAt5,
      };
    } else return undefined;
  }
);

const amtSlice = createSlice({
  name: "amt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        state.contract = action.payload?.newContract;
      })
      .addCase(getAmtbalance.fulfilled, (state, action) => {
        state.balance = action.payload?.newBalance;
      })
      .addCase(getAmtbalance.pending, (state) => {
        state.balance = undefined;
      })
      .addCase(getPrecioEnBtc.pending, (state) => {
        state.precioEnBtc = undefined;
      })
      .addCase(getPrecioEnBtc.fulfilled, (state, action) => {
        state.precioEnBtc = action.payload?.precio;
      })
      .addCase(getPrecioEnUsdt.pending, (state) => {
        state.precioEnUsdt = undefined;
      })
      .addCase(getPrecioEnUsdt.fulfilled, (state, action) => {
        state.precioEnUsdt = action.payload?.precio;
      })
      .addCase(getAllowanceMarket.fulfilled, (state, action) => {
        state.allowanceMarket = action.payload?.newAllowance;
      })
      .addCase(getAllowanceMarket.pending, (state) => {
        state.allowanceMarket = undefined;
      })
      .addCase(getAllowanceBurnVault.fulfilled, (state, action) => {
        state.allowanceBurnVault = action.payload?.newAllowance;
      })
      .addCase(getAllowanceBurnVault.pending, (state) => {
        state.allowanceBurnVault = undefined;
      })
      .addCase(getAllowanceVaultAmt.fulfilled, (state, action) => {
        state.allowanceVaultAmt = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultAmt.pending, (state) => {
        state.allowanceVaultAmt = undefined;
      })
      .addCase(getAllowanceVaultBtcb.fulfilled, (state, action) => {
        state.allowanceVaultBtcb = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultBtcb.pending, (state) => {
        state.allowanceVaultBtcb = undefined;
      })
      .addCase(getAllowanceVaultBtcbLiq.fulfilled, (state, action) => {
        state.allowanceVaultBtcbLiq = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultBtcbLiq.pending, (state) => {
        state.allowanceVaultBtcbLiq = undefined;
      })
      .addCase(getAllowanceMaster.fulfilled, (state, action) => {
        state.allowanceMaster = action.payload?.newAllowance;
      })
      .addCase(getAllowanceMaster.pending, (state) => {
        state.allowanceMaster = undefined;
      })
      .addCase(getCurrentSnapshotId.fulfilled, (state, action) => {
        state.currentSnapshot = action.payload?.newCurrentSnapshotId;
      })
      .addCase(getCurrentSnapshotId.pending, (state) => {
        state.currentSnapshot = undefined;
      })
      .addCase(getTotalSupply.fulfilled, (state, action) => {
        state.totalSupply = action.payload?.newTotalSupply;
      })
      .addCase(getTotalSupply.pending, (state) => {
        state.totalSupply = undefined;
      })
      .addCase(getBalanceOfPool.fulfilled, (state, action) => {
        state.balanceOfPool = action.payload?.newBalanceOfPool;
      })
      .addCase(getBalanceOfPool.pending, (state) => {
        state.balanceOfPool = undefined;
      })
      .addCase(getBalanceOfAt.fulfilled, (state, action) => {
        state.balanceOfAt1 = action.payload?.balanceOfAt1;
        state.balanceOfAt2 = action.payload?.balanceOfAt2;
        state.balanceOfAt3 = action.payload?.balanceOfAt3;
        state.balanceOfAt4 = action.payload?.balanceOfAt4;
        state.balanceOfAt5 = action.payload?.balanceOfAt5;
      })
      .addCase(getBalanceOfAt.pending, (state) => {
        state.balanceOfAt1 = undefined;
        state.balanceOfAt2 = undefined;
        state.balanceOfAt3 = undefined;
        state.balanceOfAt4 = undefined;
        state.balanceOfAt5 = undefined;
      })
      .addCase(getTotalSupplyAt.fulfilled, (state, action) => {
        state.totalSupplyAt1 = action.payload?.totalSupplyAt1;
        state.totalSupplyAt2 = action.payload?.totalSupplyAt2;
        state.totalSupplyAt3 = action.payload?.totalSupplyAt3;
        state.totalSupplyAt4 = action.payload?.totalSupplyAt4;
        state.totalSupplyAt5 = action.payload?.totalSupplyAt5;
      })
      .addCase(getTotalSupplyAt.pending, (state) => {
        state.totalSupplyAt1 = undefined;
        state.totalSupplyAt2 = undefined;
        state.totalSupplyAt3 = undefined;
        state.totalSupplyAt4 = undefined;
        state.totalSupplyAt5 = undefined;
      })
      .addCase(getBalanceOfPoolAt.fulfilled, (state, action) => {
        state.balanceOfPoolAt1 = action.payload?.balanceOfAt1;
        state.balanceOfPoolAt2 = action.payload?.balanceOfAt2;
        state.balanceOfPoolAt3 = action.payload?.balanceOfAt3;
        state.balanceOfPoolAt4 = action.payload?.balanceOfAt4;
        state.balanceOfPoolAt5 = action.payload?.balanceOfAt5;
      });
  },
});

const generalLoadAmt = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getAmtbalance());
  dispatch(getAllowanceBurnVault());
  dispatch(getAllowanceMarket());
  dispatch(getAllowanceMaster());
  dispatch(getAllowanceVaultAmt());
  dispatch(getAllowanceVaultBtcb());
  dispatch(getAllowanceVaultBtcbLiq());
  dispatch(getCurrentSnapshotId());
  dispatch(getBalanceOfPool());
  dispatch(getTotalSupply());
  const promisePrecioEnBtc = dispatch(getPrecioEnBtc());
  const promisePrecioDeBtcEnUsdt = dispatch(getPrecioEnUsdtOfBtc());
  Promise.all([promisePrecioEnBtc, promisePrecioDeBtcEnUsdt]).then(() => {
    dispatch(getPrecioEnUsdt());
  });
};

const loadBalancesOfAt = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getBalanceOfAt(maxSnapshot));
};

const loadTotalSupplyAt = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getTotalSupplyAt(maxSnapshot));
};

const loadBalanceOfPoolAt = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getBalanceOfPoolAt(maxSnapshot));
};

const loaderWithSnapshots = (dispatch: AppDispatch, maxSnapshot: number) => {
  loadBalancesOfAt(dispatch, maxSnapshot);
  loadTotalSupplyAt(dispatch, maxSnapshot);
  loadBalanceOfPoolAt(dispatch, maxSnapshot);
};

export const amtLoaders = {
  generalLoadAmt,
  loadBalanceOfPoolAt,
  loadBalancesOfAt,
  loadTotalSupplyAt,
  loaderWithSnapshots,
};
export const amtActions = amtSlice.actions;

export default amtSlice.reducer;
