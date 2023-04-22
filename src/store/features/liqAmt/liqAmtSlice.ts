import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiLiqAmt from "../../../contracts/abis/liquidityAmt.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

export interface usdtState {
  contract: any | null;
  balance: string | null;
  allowanceMarketVault: string | null;
  allowanceVaultAmt: string | null;
  allowanceVaultBtcb: string | null;
  allowanceVaultBtcbLiq: string | null;
  allowanceMaster: string | null;
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
}

const initialState: usdtState = {
  contract: null,
  balance: null,
  allowanceMarketVault: null,
  allowanceVaultAmt: null,
  allowanceVaultBtcb: null,
  allowanceVaultBtcbLiq: null,
  allowanceMaster: null,
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
};

export const createContract = createAsyncThunk(
  "liqAmt/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.LiqAmt,
        abiLiqAmt,
        signer
      );
      return { newContract };
    } else return null;
  }
);

export const getBalance = createAsyncThunk("liqAmt/getBalance", async () => {
  const staticState = getStaticState();
  const contract = staticState.liqAmt.contract;
  const address = staticState.wallet.address;
  if (contract) {
    const newBalance = (await contract.balanceOf(address)).toString();
    console.log(newBalance);
    return { newBalance };
  } else return null;
});

export const getAllowanceMarketVault = createAsyncThunk(
  "liqAmt/getAllowanceMarketVault",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getAllowanceVaultAmt",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getAllowanceVaultBtcb",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getAllowanceVaultBtcbLiq",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getAllowanceMaster",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = (
        await contract.allowance(address, contractAddresses.Master)
      ).toString();
      return { newAllowance };
    } else return null;
  }
);
export const getBalanceOfAt = createAsyncThunk(
  "liqAmt/getBalanceOfAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getTotalSupplyAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;

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

const liqAmtSlice = createSlice({
  name: "liqAmt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        state.contract = action.payload?.newContract;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.balance = action.payload?.newBalance;
      })
      .addCase(getBalance.pending, (state) => {
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
      .addCase(getTotalSupplyAt.fulfilled, (state, action) => {
        state.totalSupplyAt1 = action.payload?.totalSupplyAt1;
        state.totalSupplyAt2 = action.payload?.totalSupplyAt2;
        state.totalSupplyAt3 = action.payload?.totalSupplyAt3;
        state.totalSupplyAt4 = action.payload?.totalSupplyAt4;
        state.totalSupplyAt5 = action.payload?.totalSupplyAt5;
      })
      .addCase(getBalanceOfAt.fulfilled, (state, action) => {
        console.log(action.payload);
        state.balanceOfAt1 = action.payload?.balanceOfAt1;
        state.balanceOfAt2 = action.payload?.balanceOfAt2;
        state.balanceOfAt3 = action.payload?.balanceOfAt3;
        state.balanceOfAt4 = action.payload?.balanceOfAt4;
        state.balanceOfAt5 = action.payload?.balanceOfAt5;
      });
  },
});

const generalLoadLiqAmt = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalance());
  dispatch(getAllowanceMarketVault());
  dispatch(getAllowanceMaster());
  dispatch(getAllowanceVaultAmt());
  dispatch(getAllowanceVaultBtcb());
  dispatch(getAllowanceVaultBtcbLiq());
};

const loadTotalSupplyAt = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getTotalSupplyAt(maxSnapshot));
};

const loadBalancesOfAt = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getBalanceOfAt(maxSnapshot));
};

export const liqAmtLoaders = {
  generalLoadLiqAmt,
  loadBalancesOfAt,
  loadTotalSupplyAt,
};
export const liqAmtActions = liqAmtSlice.actions;
export default liqAmtSlice.reducer;
