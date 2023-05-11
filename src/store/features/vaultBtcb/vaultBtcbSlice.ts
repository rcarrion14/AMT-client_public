// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiVaultBtcb from "../../../contracts/abis/vaultBtcb.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";

interface vaultBtcbState {
  contract: any | null;
  balanceAmt: number | undefined;
  balanceUserAmt: number | undefined;
  balanceUserBtcb: number | undefined;
}

const initialState: vaultBtcbState = {
  contract: null,
  balanceAmt: undefined,
  balanceUserAmt: undefined,
  balanceUserBtcb: undefined,
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
      const newBalance = formatter(await contract.amtStacked());
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
      const newBalance = formatter(await contract.addressAmt(address));
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

      let newBalance;
      shares == 0
        ? (newBalance = ethers.BigNumber.from(0))
        : (newBalance = formatter(
            await contract.btcToWithdrawl(address, shares)
          ));

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
        state.balanceAmt = undefined;
      })
      .addCase(getBalanceUserAmt.fulfilled, (state, action) => {
        state.balanceUserAmt = action.payload?.newBalance;
      })
      .addCase(getBalanceUserAmt.pending, (state) => {
        state.balanceUserAmt = undefined;
      }) //
      .addCase(getBalanceUserBtcb.fulfilled, (state, action) => {
        state.balanceUserBtcb = action.payload?.newBalance;
      })
      .addCase(getBalanceUserBtcb.pending, (state, action) => {
        state.balanceUserBtcb = undefined;
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
