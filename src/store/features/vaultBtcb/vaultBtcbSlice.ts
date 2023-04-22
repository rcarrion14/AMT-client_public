import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiVaultBtcb from "../../../contracts/abis/vaultBtcb.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

interface vaultBtcbState {
  contract: any | null;
  balanceAmt: string | null;
  balanceUserAmt: string | null;
  balanceUserBtcb: string | null;
}

const initialState: vaultBtcbState = {
  contract: null,
  balanceAmt: null,
  balanceUserAmt: null,
  balanceUserBtcb: null,
};

export const createContract = createAsyncThunk(
  "vaultBtcb/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.VaultBtcb,
        abiVaultBtcb,
        signer
      );
      return { newContract };
    }
  }
);

export const getBalanceAmt = createAsyncThunk(
  "vaultBtcb/getBalanceAmt",
  async () => {
    const contract = getStaticState().vaultBtcb.contract;
    if (contract) {
      const newBalance = await contract.amtStacked();
      return { newBalance };
    }
  }
);

export const getBalanceUserAmt = createAsyncThunk(
  "vaultBtcb/getBalanceUserAmt",
  async () => {
    const contract = getStaticState().vaultBtcb.contract;
    const address = getStaticState().wallet.address;
    if (contract) {
      console.log(contract);

      const newBalance = await contract.addressAmt(address);
      return { newBalance };
    }
  }
);

export const getBalanceUserBtcb = createAsyncThunk(
  "vaultBtcb/getBalanceUserBtcb",
  async () => {
    const contract = getStaticState().vaultBtcb.contract;
    const address = getStaticState().wallet.address;

    if (contract) {
      const shares = await contract.addressShares(address);
      console.log(contract);

      let newBalance;
      shares == 0
        ? (newBalance = ethers.utils.parseEther("0"))
        : (newBalance = await contract.btcToWithdrawl(address, shares));
      return { newBalance };
    }
  }
);

const vaultBtcbSlice = createSlice({
  name: "vaultBtcb",
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
      }) //
      .addCase(getBalanceUserBtcb.fulfilled, (state, action) => {
        state.balanceUserBtcb = action.payload?.newBalance;
      })
      .addCase(getBalanceUserBtcb.pending, (state, action) => {
        state.balanceUserBtcb = "requesting";
      });
  },
});

export const vaultBtcbActions = vaultBtcbSlice.actions;
export default vaultBtcbSlice.reducer;

export const generalLoadVaultBtcb = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalanceAmt());
  dispatch(getBalanceUserAmt());
  dispatch(getBalanceUserBtcb());
};
