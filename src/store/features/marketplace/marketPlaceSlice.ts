import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiCamboriu from "../../../contracts/abis/camboriu.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

export interface marketPlaceState {
  contract: any | null;
  amtEnVenta: string | null;
  precioVenta: string | undefined; //Change to null on prod
}

const initialState: marketPlaceState = {
  contract: null,
  amtEnVenta: null,
  precioVenta: undefined, //Change to null on prod
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

export const getPrecioVenta = createAsyncThunk(
  "marketplace/getPrecioVenta",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = contractAddresses.Camboriu;
    if (contract) {
      console.log("Getting amtEnVenta");
      //const newPrecioVenta = (await contract.precioVenta()).toString(); //Change when new marketplace is deployed
      const newPrecioVenta = (1).toString();
      return { newPrecioVenta };
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
      })
      .addCase(getPrecioVenta.fulfilled, (state, action) => {
        state.precioVenta = action.payload?.newPrecioVenta;
      });
  },
});

export const generalLoadMarketPlace = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getAmtEnVenta());
  dispatch(getPrecioVenta());
};
export const marketPlaceActions = marketPlaceSlice.actions;
export default marketPlaceSlice.reducer;
