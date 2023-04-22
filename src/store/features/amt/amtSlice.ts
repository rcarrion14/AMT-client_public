import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiAmt from "../../../contracts/abis/amt.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

export interface amtState {
  contract: any | null;
  balance: string | null;
  allowanceMarketVault: string | null;
  allowanceVaultAmt: string | null;
  allowanceVaultBtcb: string | null;
  allowanceVaultBtcbLiq: string | null;
  allowanceMaster: string | null;
  currentSnapshot: string | null;
  balanceOfPool: string | null;
  totalSupply: string | null;

  balanceOfMarket: string | null;

  balanceOfAt1: string | null;
  balanceOfAt2: string | null;
  balanceOfAt3: string | null;
  balanceOfAt4: string | null;
  balanceOfAt5: string | null;

  totalSupplyAt1: string | null;
  totalSupplyAt2: string | null;
  totalSupplyAt3: string | null;
  totalSupplyAt4: string | null;
  totalSupplyAt5: string | null;

  balanceOfPoolAt1: string | null;
  balanceOfPoolAt2: string | null;
  balanceOfPoolAt3: string | null;
  balanceOfPoolAt4: string | null;
  balanceOfPoolAt5: string | null;
}

const initialState: amtState = {
  contract: null,
  balance: null,
  allowanceMarketVault: null,
  allowanceVaultAmt: null,
  allowanceVaultBtcb: null,
  allowanceVaultBtcbLiq: null,
  allowanceMaster: null,
  currentSnapshot: null,
  balanceOfPool: null,
  totalSupply: null,

  balanceOfMarket: null,
  balanceOfAt1: null,
  balanceOfAt2: null,
  balanceOfAt3: null,
  balanceOfAt4: null,
  balanceOfAt5: null,

  totalSupplyAt1: null,
  totalSupplyAt2: null,
  totalSupplyAt3: null,
  totalSupplyAt4: null,
  totalSupplyAt5: null,

  balanceOfPoolAt1: null,
  balanceOfPoolAt2: null,
  balanceOfPoolAt3: null,
  balanceOfPoolAt4: null,
  balanceOfPoolAt5: null,
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
    console.log("Getting balance for: " + address);
    const newBalance = (await contract.balanceOf(address)).toString();
    console.log(newBalance);
    return { newBalance };
  } else return null;
});
export const getAllowanceMarketVault = createAsyncThunk(
  "amt/getAllowanceMarketVault",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = (
        await contract.allowance(address, contractAddresses.MarketVault)
      ).toString();
      return { newAllowance };
    } else return null;
  }
);

export const getAllowanceVaultAmt = createAsyncThunk(
  "amt/getAllowanceVaultAmt",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = (
        await contract.allowance(address, contractAddresses.VaultAmt)
      ).toString();
      return { newAllowance };
    } else return null;
  }
);

export const getAllowanceVaultBtcb = createAsyncThunk(
  "amt/getAllowanceVaultBtcb",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = (
        await contract.allowance(address, contractAddresses.VaultBtcb)
      ).toString();
      return { newAllowance };
    } else return null;
  }
);

export const getAllowanceVaultBtcbLiq = createAsyncThunk(
  "amt/getAllowanceVaultBtcbLiq",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = (
        await contract.allowance(address, contractAddresses.VaultBtcbLiq)
      ).toString();
      return { newAllowance };
    } else return null;
  }
);
export const getAllowanceMaster = createAsyncThunk(
  "amt/getAllowanceMaster",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = (
        await contract.allowance(address, contractAddresses.Master)
      ).toString();
      return { newAllowance };
    } else return null;
  }
);

export const getCurrentSnapshotId = createAsyncThunk(
  "amt/getCurrentSnapshotId",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const newCurrentSnapshotId = (
        await contract.getCurrentSnapshotId()
      ).toString();
      return { newCurrentSnapshotId };
    } else return null;
  }
);

export const getTotalSupply = createAsyncThunk(
  "amt/getTotalSupply",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const newTotalSupply = (await contract.totalSupply()).toString();
      return { newTotalSupply };
    } else return null;
  }
);

export const getBalanceOfPool = createAsyncThunk(
  "amt/getBalanceOfPool",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const newBalanceOfPool = (
        await contract.balanceOf(contractAddresses.LiqPool)
      ).toString();
      return { newBalanceOfPool };
    } else return null;
  }
);

export const getBalanceOfAt = createAsyncThunk(
  "amt/getBalanceOfAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const balanceOfAt1 = (
        await contract.balanceOfAt(address, snapshot)
      ).toString();
      const balanceOfAt2 = (
        await contract.balanceOfAt(address, snapshot - 1)
      ).toString();
      const balanceOfAt3 = (
        await contract.balanceOfAt(address, snapshot - 2)
      ).toString();
      const balanceOfAt4 = (
        await contract.balanceOfAt(address, snapshot - 3)
      ).toString();
      const balanceOfAt5 = (
        await contract.balanceOfAt(address, snapshot - 4)
      ).toString();

      return {
        balanceOfAt1,
        balanceOfAt2,
        balanceOfAt3,
        balanceOfAt4,
        balanceOfAt5,
      };
    } else return null;
  }
);

export const getTotalSupplyAt = createAsyncThunk(
  "amt/getTotalSupplyAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const totalSupplyAt1 = (
        await contract.totalSupplyAt(snapshot)
      ).toString();
      const totalSupplyAt2 = (
        await contract.totalSupplyAt(snapshot - 1)
      ).toString();
      const totalSupplyAt3 = (
        await contract.totalSupplyAt(snapshot - 2)
      ).toString();
      const totalSupplyAt4 = (
        await contract.totalSupplyAt(snapshot - 3)
      ).toString();
      const totalSupplyAt5 = (
        await contract.totalSupplyAt(snapshot - 4)
      ).toString();

      return {
        totalSupplyAt1,
        totalSupplyAt2,
        totalSupplyAt3,
        totalSupplyAt4,
        totalSupplyAt5,
      };
    } else return null;
  }
);

export const getBalanceOfPoolAt = createAsyncThunk(
  "amt/getBalanceOfPoolAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = contractAddresses.LiqPool;

    if (contract) {
      const balanceOfAt1 = (
        await contract.balanceOfAt(address, snapshot)
      ).toString();
      const balanceOfAt2 = (
        await contract.balanceOfAt(address, snapshot - 1)
      ).toString();
      const balanceOfAt3 = (
        await contract.balanceOfAt(address, snapshot - 2)
      ).toString();
      const balanceOfAt4 = (
        await contract.balanceOfAt(address, snapshot - 3)
      ).toString();
      const balanceOfAt5 = (
        await contract.balanceOfAt(address, snapshot - 4)
      ).toString();

      return {
        balanceOfAt1,
        balanceOfAt2,
        balanceOfAt3,
        balanceOfAt4,
        balanceOfAt5,
      };
    } else return null;
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
        state.balance = "requesting";
      })
      .addCase(getAllowanceMarketVault.fulfilled, (state, action) => {
        state.allowanceMarketVault = action.payload?.newAllowance;
      })
      .addCase(getAllowanceMarketVault.pending, (state) => {
        state.allowanceMarketVault = "requesting";
      })
      .addCase(getAllowanceVaultAmt.fulfilled, (state, action) => {
        state.allowanceVaultAmt = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultAmt.pending, (state) => {
        state.allowanceVaultAmt = "requesting";
      })
      .addCase(getAllowanceVaultBtcb.fulfilled, (state, action) => {
        state.allowanceVaultBtcb = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultBtcb.pending, (state) => {
        state.allowanceVaultBtcb = "requesting";
      })
      .addCase(getAllowanceVaultBtcbLiq.fulfilled, (state, action) => {
        state.allowanceVaultBtcbLiq = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultBtcbLiq.pending, (state) => {
        state.allowanceVaultBtcbLiq = "requesting";
      })
      .addCase(getAllowanceMaster.fulfilled, (state, action) => {
        state.allowanceMaster = action.payload?.newAllowance;
      })
      .addCase(getAllowanceMaster.pending, (state) => {
        state.allowanceMaster = "requesting";
      })
      .addCase(getCurrentSnapshotId.fulfilled, (state, action) => {
        state.currentSnapshot = action.payload?.newCurrentSnapshotId;
      })
      .addCase(getCurrentSnapshotId.pending, (state) => {
        state.currentSnapshot = "requesting";
      })
      .addCase(getTotalSupply.fulfilled, (state, action) => {
        state.totalSupply = action.payload?.newTotalSupply;
      })
      .addCase(getTotalSupply.pending, (state) => {
        state.totalSupply = "requesting";
      })
      .addCase(getBalanceOfPool.fulfilled, (state, action) => {
        state.balanceOfPool = action.payload?.newBalanceOfPool;
      })
      .addCase(getBalanceOfPool.pending, (state) => {
        state.balanceOfPool = "requesting";
      })
      .addCase(getBalanceOfAt.fulfilled, (state, action) => {
        state.balanceOfAt1 = action.payload?.balanceOfAt1;
        state.balanceOfAt2 = action.payload?.balanceOfAt2;
        state.balanceOfAt3 = action.payload?.balanceOfAt3;
        state.balanceOfAt4 = action.payload?.balanceOfAt4;
        state.balanceOfAt5 = action.payload?.balanceOfAt5;
      })
      .addCase(getBalanceOfAt.pending, (state) => {
        state.balanceOfAt1 = "requesting";
        state.balanceOfAt2 = "requesting";
        state.balanceOfAt3 = "requesting";
        state.balanceOfAt4 = "requesting";
        state.balanceOfAt5 = "requesting";
      })
      .addCase(getTotalSupplyAt.fulfilled, (state, action) => {
        state.totalSupplyAt1 = action.payload?.totalSupplyAt1;
        state.totalSupplyAt2 = action.payload?.totalSupplyAt2;
        state.totalSupplyAt3 = action.payload?.totalSupplyAt3;
        state.totalSupplyAt4 = action.payload?.totalSupplyAt4;
        state.totalSupplyAt5 = action.payload?.totalSupplyAt5;
      })
      .addCase(getTotalSupplyAt.pending, (state) => {
        state.totalSupplyAt1 = "requesting";
        state.totalSupplyAt2 = "requesting";
        state.totalSupplyAt3 = "requesting";
        state.totalSupplyAt4 = "requesting";
        state.totalSupplyAt5 = "requesting";
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
  dispatch(getAllowanceMarketVault());
  dispatch(getAllowanceMaster());
  dispatch(getAllowanceVaultAmt());
  dispatch(getAllowanceVaultBtcb());
  dispatch(getAllowanceVaultBtcbLiq());
  dispatch(getCurrentSnapshotId());
  dispatch(getBalanceOfPool());
  dispatch(getTotalSupply());
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

export const amtLoaders = {
  generalLoadAmt,
  loadBalanceOfPoolAt,
  loadBalancesOfAt,
  loadTotalSupplyAt,
};
export const amtActions = amtSlice.actions;

export default amtSlice.reducer;
