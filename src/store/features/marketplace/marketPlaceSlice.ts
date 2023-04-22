import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiCamboriu from "../../../contracts/abis/camboriu.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

export interface marketPlaceState {
  contract: any | null;
  amtEnVenta: string | null;
}

const initialState: marketPlaceState = {
  contract: null,
  amtEnVenta: null,
};

export const createContract = createAsyncThunk(
  "marketPlace/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.Camboriu,
        abiCamboriu,
        signer
      );
      return { newContract };
    } else return null;
  }
);

export const getAmtEnVenta = createAsyncThunk(
  "marketPlace/getAmtEnVenta",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = contractAddresses.Camboriu;
    if (contract) {
      console.log("Getting amtEnVenta");
      const newBalance = (await contract.balanceOf(address)).toString();
      console.log(newBalance);
      return { newBalance };
    } else return null;
  }
);

const marketPlaceSlice = createSlice({
  name: "marketPlace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        state.contract = action.payload?.newContract;
      })
      .addCase(getAmtEnVenta.fulfilled, (state, action) => {
        state.amtEnVenta = action.payload?.newBalance;
      });
  },
});

export const generalLoadMarketPlace = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getAmtEnVenta());
};
export const marketPlaceActions = marketPlaceSlice.actions;
export default marketPlaceSlice.reducer;
