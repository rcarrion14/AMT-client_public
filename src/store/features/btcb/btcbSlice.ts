import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiBtcb from "../../../contracts/abis/btcb.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

export interface btcbState {
  contract: any | null;
  balance: string | null;
  allowanceMarketVault: string | null;
  allowanceVaultAmt: string | null;
  allowanceVaultBtcb: string | null;
  allowanceVaultBtcbLiq: string | null;
  allowanceMaster: string | null;
}

const initialState: btcbState = {
  contract: null,
  balance: null,
  allowanceMarketVault: null,
  allowanceVaultAmt: null,
  allowanceVaultBtcb: null,
  allowanceVaultBtcbLiq: null,
  allowanceMaster: null,
};

export const createContract = createAsyncThunk(
  "btcb/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.Btcb,
        abiBtcb,
        signer
      );
      return { newContract };
    } else return null;
  }
);

export const getBalance = createAsyncThunk("btcb/getBalance", async () => {
  const staticState = getStaticState();
  const contract = staticState.btcb.contract;
  const address = staticState.wallet.address;
  if (contract) {
    console.log("Getting balance for: " + address);
    const newBalance = (await contract.balanceOf(address)).toString();
    console.log(newBalance);
    return { newBalance };
  } else return null;
});

export const getAllowanceMarketVault = createAsyncThunk(
  "btcb/getAllowanceMarketVault",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
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
  "btcb/getAllowanceVaultAmt",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
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
  "btcb/getAllowanceVaultBtcb",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
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
  "btcb/getAllowanceVaultBtcbLiq",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
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
  "btcb/getAllowanceMaster",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = (
        await contract.allowance(address, contractAddresses.Master)
      ).toString();
      return { newAllowance };
    } else return null;
  }
);

const btcbSlice = createSlice({
  name: "btcb",
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
export const btcbActions = btcbSlice.actions;
export default btcbSlice.reducer;
export const generalLoadBtcb = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalance());
  dispatch(getAllowanceMarketVault());
  dispatch(getAllowanceMaster());
  dispatch(getAllowanceVaultAmt());
  dispatch(getAllowanceVaultBtcb());
  dispatch(getAllowanceVaultBtcbLiq());
};
