import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiMarketplace from "../../../contracts/abis/marketplace.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";
import { Market } from "../../../contracts/Interfaces/Market";

export interface marketPlaceState {
  contract: Market | undefined;
  amtEnVenta: BigNumber | undefined;
  precioVenta: number | undefined; //Change to null on prod
}

const initialState: marketPlaceState = {
  contract: undefined,
  amtEnVenta: undefined,
  precioVenta: undefined, //Change to null on prod
};

export const createContract = createAsyncThunk(
  "marketPlace/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.marketPlace,
        abiMarketplace,
        signer
      ) as Market;
      return { newContract };
    } else return undefined;
  }
);

export const getAmtEnVenta = createAsyncThunk(
  "marketPlace/getAmtEnVenta",
  async () => {
    
    const staticState = getStaticState();
    const contract = staticState.amt.contract;
    const address = contractAddresses.marketPlace;
    if (contract) {
      const newBalance = formatter(await contract.balanceOf(address));
      return { newBalance };
    } else return null;
  }
);

export const getPrecioVenta = createAsyncThunk(
  "marketplace/getPrecioVenta",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.marketPlace.contract;
    if (contract) {
      const newPrecioVenta = ((await contract.usdPer100Amt()).toNumber()/100);
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
        //@ts-ignore
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
