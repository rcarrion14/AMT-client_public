import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiVaultAmt from "../../../contracts/abis/vaultAmt.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

interface vaultAmtState {
  contract: any | null;
  balanceAmt: string | null;
  balanceUserAmt: string | null;
}

const initialState: vaultAmtState = {
  contract: null,
  balanceAmt: null,
  balanceUserAmt: null,
};

export const createContract = createAsyncThunk(
  "vaultAmt/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.VaultAmt,
        abiVaultAmt,
        signer
      );
      return { newContract };
    }
  }
);

export const getBalanceAmt = createAsyncThunk(
  "vaultAmt/getBalanceAmt",
  async () => {
    const contract = getStaticState().vaultAmt.contract;
    if (contract) {
      const newBalance = await contract.amtStacked();
      return { newBalance };
    }
  }
);

export const getBalanceUserAmt = createAsyncThunk(
  "vaultAmt/getBalanceUserAmt",
  async () => {
    const contract = getStaticState().vaultAmt.contract;
    const address = getStaticState().wallet.address;
    if (contract) {
      const newBalance = await contract.addressAmt(address);
      return { newBalance };
    }
  }
);

const vaultAmtSlice = createSlice({
  name: "vaultAmt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        state.contract = action.payload?.newContract;
      })
      .addCase(getBalanceAmt.fulfilled, (state, action) => {
        state.balanceAmt = action.payload?.newBalance;
      })
      .addCase(getBalanceAmt.pending, (state, action) => {
        state.balanceAmt = "requesting";
      })
      .addCase(getBalanceUserAmt.fulfilled, (state, action) => {
        state.balanceUserAmt = action.payload?.newBalance;
      })
      .addCase(getBalanceUserAmt.pending, (state) => {
        state.balanceUserAmt = "requesting";
      });
  },
});

export const vaultAmtActions = vaultAmtSlice.actions;
export default vaultAmtSlice.reducer;

export const generalLoadVaultAmt = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalanceAmt());
  dispatch(getBalanceUserAmt());
};
