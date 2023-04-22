import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiUsdt from "../../../contracts/abis/genericERC20.json";
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
}

const initialState: usdtState = {
  contract: null,
  balance: null,
  allowanceMarketVault: null,
  allowanceVaultAmt: null,
  allowanceVaultBtcb: null,
  allowanceVaultBtcbLiq: null,
  allowanceMaster: null,
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
    console.log("Getting balance for: " + address);
    const newBalance = (await contract.balanceOf(address)).toString();
    console.log(newBalance);
    return { newBalance };
  } else return null;
});

export const getAllowanceMarketVault = createAsyncThunk(
  "usdt/getAllowanceMarketVault",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.usdt.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = (
        await contract.allowance(address, contractAddresses.Camboriu)
      ).toString();
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
      const newAllowance = (
        await contract.allowance(address, contractAddresses.VaultAmt)
      ).toString();
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
      const newAllowance = (
        await contract.allowance(address, contractAddresses.VaultBtcb)
      ).toString();
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
      const newAllowance = (
        await contract.allowance(address, contractAddresses.VaultBtcbLiq)
      ).toString();
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
      const newAllowance = (
        await contract.allowance(address, contractAddresses.Master)
      ).toString();
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
      });
  },
});

export const generalLoadUsdt = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalance());
  dispatch(getAllowanceMarketVault());
  dispatch(getAllowanceMaster());
  dispatch(getAllowanceVaultAmt());
  dispatch(getAllowanceVaultBtcb());
  dispatch(getAllowanceVaultBtcbLiq());
};
export const usdtActions = usdtSlice.actions;
export default usdtSlice.reducer;
