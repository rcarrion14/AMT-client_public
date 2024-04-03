import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiBurnVault from "../../../contracts/abis/burnVault.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

export interface burnVaultState {
  contract: any | undefined;
  backRate: number | undefined;
}

const initialState: burnVaultState = {
  contract: undefined,
  backRate: undefined,
};

export const createContract = createAsyncThunk(
  "burnVault/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.burnVault,
        abiBurnVault,
        signer
      );
      return { newContract };
    } else return undefined;
  }
);
export const getBackRate = createAsyncThunk(
  "burnVault/getBackRate",
  async () => {
    const staticState = getStaticState();
    const contractAmt = staticState.amt.contract;
    const contractBtcb = staticState.btcb.contract;

    if (contractAmt && contractBtcb) {
      const totalSupplyAmt = await contractAmt.totalSupply();
      const balanceOfBurnVault = await contractBtcb.balanceOf(
        contractAddresses.burnVault
      );
      const newBackRate = totalSupplyAmt.div(balanceOfBurnVault);

      return { newBackRate };
    } else return undefined;
  }
);

const burnVault = createSlice({
  name: "burnVault",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        state.contract = action.payload?.newContract;
      })
      .addCase(getBackRate.fulfilled, (state, action) => {
        state.backRate = action.payload?.newBackRate;
      })
      .addCase(getBackRate.pending, (state) => {
        state.backRate = undefined;
      });
  },
});

const generalLoad = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBackRate());
};
export const burnVaultActions = burnVault.actions;

export default burnVault.reducer;

export const burnVaultLoaders = { generalLoad };
