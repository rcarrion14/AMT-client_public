import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiMarketVault from "../../../contracts/abis/marketVault.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";

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
        contractAddresses.MarketVault,
        abiMarketVault,
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
    const contract = staticState.burnVault.contract;
    const address = staticState.wallet.address;
    if (contract) {
      const newBackRate = parseFloat(await contract.getBackRate());

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
