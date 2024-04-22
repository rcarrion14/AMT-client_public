import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiPriceFeeder from "../../../contracts/abis/priceFeeder.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { PriceFeeder } from "../../../contracts/Interfaces/PriceFeeder";

export interface LoanProtocolState {
  contract: PriceFeeder | undefined;
  latestBtcbPrice: BigNumber | undefined;
  priceQuotedAmt: BigNumber | undefined;
  pendingQuote: boolean;
  price1Amt: BigNumber | undefined;
}

const initialState: LoanProtocolState = {
  contract: undefined,
  latestBtcbPrice: undefined,
  priceQuotedAmt: undefined,
  pendingQuote: false,
  price1Amt: undefined,
};

export const createContract = createAsyncThunk(
  "priceFeeder/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.priceFeeder,
        abiPriceFeeder,
        signer
      ) as PriceFeeder;
      return { newContract };
    } else return undefined;
  }
);

export const getLatestBtcbPrice = createAsyncThunk(
  "priceFeeder/getLatestBtcbPrice",
  async () => {
    const staticState = getStaticState();
    const priceFeeder = staticState.priceFeeder.contract;

    if (priceFeeder) {
      const newPrice = await priceFeeder.getLatestBTCBPrice();
      return { newPrice };
    } else return undefined;
  }
);

export const getNewPrice1Amt = createAsyncThunk(
  "priceFeeder/getNewPrice1Amt",
  async () => {
    const staticState = getStaticState();
    const priceFeeder = staticState.priceFeeder.contract;
    if (priceFeeder) {
      const newPrice1Amt = await priceFeeder.getPrice(
        ethers.utils.parseEther("1")
      );
      return { newPrice1Amt };
    } else return undefined;
  }
);

export const getNewPriceQuotedAmt = createAsyncThunk(
  "priceFeeder/getNewPriceQuotedAmt",
  async (amtAmountToQuote: BigNumber) => {
    const staticState = getStaticState();
    const priceFeeder = staticState.priceFeeder.contract;
    if (priceFeeder) {
      var newPrice;
      if (amtAmountToQuote.lte(0)) {
        newPrice = BigNumber.from(0);
      } else {
        newPrice = await priceFeeder.getPrice(amtAmountToQuote);
      }

      return { newPrice };
    } else return undefined;
  }
);

const priceFeederSlice = createSlice({
  name: "priceFeeder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        //@ts-ignore
        state.contract = action.payload?.newContract;
      })
      .addCase(getLatestBtcbPrice.fulfilled, (state, action) => {
        state.latestBtcbPrice = action.payload?.newPrice;
      })
      .addCase(getNewPrice1Amt.fulfilled, (state, action) => {
        state.price1Amt = action.payload?.newPrice1Amt;
      })
      .addCase(getNewPriceQuotedAmt.fulfilled, (state, action) => {
        state.priceQuotedAmt = action.payload?.newPrice;
        state.pendingQuote = false;
      })
      .addCase(getNewPriceQuotedAmt.pending, (state) => {
        state.pendingQuote = true;
      });
  },
});

export const generalLoadPriceFeeder = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getLatestBtcbPrice());
  dispatch(getNewPrice1Amt());
};

export const loadQuotedAmt = (
  dispatch: AppDispatch,
  amtAmountToQuote: BigNumber
) => {
  dispatch(getNewPriceQuotedAmt(amtAmountToQuote));
};

export const priceFeederLoadres = { generalLoadPriceFeeder, loadQuotedAmt };
export const priceFeederActions = priceFeederSlice.actions;
export default priceFeederSlice.reducer;
