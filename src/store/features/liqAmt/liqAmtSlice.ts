import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiLiqAmt from "../../../contracts/abis/liquidityAmt.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";
export interface usdtState {
  contract: any | undefined;
  balance: number | undefined;
  allowanceMarketVault: number | undefined;
  allowanceVaultAmt: number | undefined;
  allowanceVaultBtcb: number | undefined;
  allowanceVaultBtcbLiq: number | undefined;
  allowanceMaster: number | undefined;
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
}

const initialState: usdtState = {
  contract: undefined,
  balance: undefined,
  allowanceMarketVault: undefined,
  allowanceVaultAmt: undefined,
  allowanceVaultBtcb: undefined,
  allowanceVaultBtcbLiq: undefined,
  allowanceMaster: undefined,
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
    } else return undefined;
  }
);

export const getBalance = createAsyncThunk("liqAmt/getBalance", async () => {
  const staticState = getStaticState();
  const contract = staticState.liqAmt.contract;
  const address = staticState.wallet.address;
  if (contract) {
    const newBalance = formatter(await contract.balanceOf(address));

    return { newBalance };
  } else return undefined;
});

export const getAllowanceMarketVault = createAsyncThunk(
  "liqAmt/getAllowanceMarketVault",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.MarketVault)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getAllowanceVaultAmt = createAsyncThunk(
  "liqAmt/getAllowanceVaultAmt",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getAllowanceVaultBtcb",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getAllowanceVaultBtcbLiq",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getAllowanceMaster",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.Master)
      );
      return { newAllowance };
    } else return undefined;
  }
);
export const getBalanceOfAt = createAsyncThunk(
  "liqAmt/getBalanceOfAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;
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
  "liqAmt/getTotalSupplyAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.liqAmt.contract;

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
        state.balance = undefined;
      })
      .addCase(getAllowanceMarketVault.fulfilled, (state, action) => {
        state.allowanceMarketVault = action.payload?.newAllowance;
      })
      .addCase(getAllowanceMarketVault.pending, (state) => {
        state.allowanceMarketVault = undefined;
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
      .addCase(getTotalSupplyAt.fulfilled, (state, action) => {
        state.totalSupplyAt1 = action.payload?.totalSupplyAt1;
        state.totalSupplyAt2 = action.payload?.totalSupplyAt2;
        state.totalSupplyAt3 = action.payload?.totalSupplyAt3;
        state.totalSupplyAt4 = action.payload?.totalSupplyAt4;
        state.totalSupplyAt5 = action.payload?.totalSupplyAt5;
      })
      .addCase(getBalanceOfAt.fulfilled, (state, action) => {
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
