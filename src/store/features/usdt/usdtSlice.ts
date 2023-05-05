import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiUsdt from "../../../contracts/abis/genericERC20.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";

export interface usdtState {
  contract: any | null;
  balance: number | undefined;
  allowanceMarket: number | undefined;
  allowanceVaultAmt: number | undefined;
  allowanceVaultBtcb: number | undefined;
  allowanceVaultBtcbLiq: number | undefined;
  allowanceMaster: number | undefined;
}

const initialState: usdtState = {
  contract: undefined,
  balance: undefined,
  allowanceMarket: undefined,
  allowanceVaultAmt: undefined,
  allowanceVaultBtcb: undefined,
  allowanceVaultBtcbLiq: undefined,
  allowanceMaster: undefined,
};

export const createContract = createAsyncThunk(
  "usdt/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.Usdt,
        abiUsdt,
        signer
      );
      return { newContract };
    } else return null;
  }
);

export const getBalance = createAsyncThunk("usdt/getBalance", async () => {
  const staticState = getStaticState();
  const contract = staticState.usdt.contract;
  const address = staticState.wallet.address;
  if (contract) {
    const newBalance = formatter(await contract.balanceOf(address));

    return { newBalance };
  } else return null;
});

export const getAllowanceMarket = createAsyncThunk(
  "usdt/getAllowanceMarket",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.usdt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.marketPlace)
      );
      return { newAllowance };
    } else return null;
  }
);

export const getAllowanceVaultAmt = createAsyncThunk(
  "usdt/getAllowanceVaultAmt",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.usdt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultAmt)
      );
      return { newAllowance };
    } else return null;
  }
);

export const getAllowanceVaultBtcb = createAsyncThunk(
  "usdt/getAllowanceVaultBtcb",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.usdt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultBtcb)
      );
      return { newAllowance };
    } else return null;
  }
);

export const getAllowanceVaultBtcbLiq = createAsyncThunk(
  "usdt/getAllowanceVaultBtcbLiq",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.usdt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultBtcbLiq)
      );
      return { newAllowance };
    } else return null;
  }
);
export const getAllowanceMaster = createAsyncThunk(
  "usdt/getAllowanceMaster",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.usdt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.Master)
      );
      return { newAllowance };
    } else return null;
  }
);

const usdtSlice = createSlice({
  name: "usdt",
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
      .addCase(getAllowanceMarket.fulfilled, (state, action) => {
        state.allowanceMarket = action.payload?.newAllowance;
      })
      .addCase(getAllowanceMarket.pending, (state) => {
        state.allowanceMarket = undefined;
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
      });
  },
});

export const generalLoadUsdt = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalance());
  dispatch(getAllowanceMarket());
  dispatch(getAllowanceMaster());
  dispatch(getAllowanceVaultAmt());
  dispatch(getAllowanceVaultBtcb());
  dispatch(getAllowanceVaultBtcbLiq());
};
export const usdtActions = usdtSlice.actions;
export default usdtSlice.reducer;
