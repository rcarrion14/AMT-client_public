// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abivaultBtcbLiquidity from "../../../contracts/abis/vaultBtcbLiq.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";

interface vaultBtcbLiquidityState {
  contract: any | null;
  balanceAmt: number | undefined;
  balanceUserAmt: number | undefined;
  balanceUserBtcb: number | undefined;
}

const initialState: vaultBtcbLiquidityState = {
  contract: null,
  balanceAmt: undefined,
  balanceUserAmt: undefined,
  balanceUserBtcb: undefined,
};

export const createContract = createAsyncThunk(
  "vaultBtcbLiquidity/createContract",
  async () => {
    console.log("LIUIQIDEZ");

    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.VaultBtcbLiq,
        abivaultBtcbLiquidity,
        signer
      );
      return { newContract };
    }
  }
);

export const getBalanceAmt = createAsyncThunk(
  "vaultBtcbLiquidity/getBalanceAmt",
  async () => {
    const contract = getStaticState().vaultBtcbLiquidity.contract;
    if (contract) {
      const newBalance = formatter(await contract.amtStacked());
      return { newBalance };
    }
  }
);

export const getBalanceUserAmt = createAsyncThunk(
  "vaultBtcbLiquidity/getBalanceUserAmt",
  async () => {
    const contract = getStaticState().vaultBtcbLiquidity.contract;
    const address = getStaticState().wallet.address;
    if (contract) {
      const newBalance = formatter(await contract.addressAmt(address));
      return { newBalance };
    }
  }
);

export const getBalanceUserBtcb = createAsyncThunk(
  "vaultBtcbLiquidity/getBalanceUserBtcb",
  async () => {
    const contract = getStaticState().vaultBtcbLiquidity.contract;
    const address = getStaticState().wallet.address;

    if (contract) {
      const shares = await contract.addressShares(address);

      let newBalance;
      shares == 0
        ? (newBalance = 0)
        : (newBalance = formatter(
            await contract.btcToWithdrawl(address, shares)
          ));

      return { newBalance };
    }
  }
);

const vaultBtcbLiquiditySlice = createSlice({
  name: "vaultBtcbLiquidity",
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

export const vaultBtcbLiquidityActions = vaultBtcbLiquiditySlice.actions;
export default vaultBtcbLiquiditySlice.reducer;

export const generalLoadVaultBtcbLiquidity = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalanceAmt());
  dispatch(getBalanceUserAmt());
  dispatch(getBalanceUserBtcb());
};
