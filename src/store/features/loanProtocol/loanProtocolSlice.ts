import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BigNumber, ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiLoanProtocol from "../../../contracts/abis/loanProtocol.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";
import { LoanProtocol } from "../../../contracts/Interfaces/LoanProtocol";

export interface LoanProtocolState {
  contract: LoanProtocol | undefined;
  userLoans: LoanProtocol.LoanStructOutput[] | undefined;
  loanRatio: BigNumber | undefined;
  usdtAvailable: BigNumber | undefined;
  allowanceAmtToLoanProtocol: BigNumber | undefined;
  allowanceUsdtToLoanProtocol: BigNumber | undefined;
}

const initialState: LoanProtocolState = {
  contract: undefined,
  userLoans: undefined,
  loanRatio: undefined,
  usdtAvailable: undefined,
  allowanceAmtToLoanProtocol: undefined,
  allowanceUsdtToLoanProtocol: undefined,
};

export const createContract = createAsyncThunk(
  "loanProtocol/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.loanProtocol,
        abiLoanProtocol,
        signer
      ) as LoanProtocol;
      return { newContract };
    } else return undefined;
  }
);

export const getUserLoans = createAsyncThunk(
  "loanProtocol/getUserLoans",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.loanProtocol.contract;
    const address = staticState.wallet.address;
    if (contract && address) {
      const newUserLoans = await contract.getUserLoans(address);
      return { newUserLoans };
    } else return undefined;
  }
);

export const getLoanRatio = createAsyncThunk(
  "loanProtocol/getLoanRatio",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.loanProtocol.contract;
    if (contract) {
      const newLoanRatio = await contract.loanRatio();
      return { newLoanRatio };
    } else return undefined;
  }
);

export const getUsdtAvailable = createAsyncThunk(
  "loanProtocol/getUsdtAvailable",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.usdt.contract;
    if (contract) {
      const newUsdtAvailable = await contract.balanceOf(
        contractAddresses.loanProtocol
      );
      return { newUsdtAvailable };
    } else return undefined;
  }
);

export const getAllowanceAmtToLoanProtocol = createAsyncThunk(
  "loanProtocol/getAllowanceAmtToLoanProtocol",
  async () => {
    const staticState = getStaticState();
    const amt = staticState.amt.contract;
    const addr = staticState.wallet.address;
    if (amt && addr) {
      const newAllowanceAmtToLoanProtocol = await amt.allowance(
        addr,
        contractAddresses.loanProtocol
      );
      return { newAllowanceAmtToLoanProtocol };
    } else return undefined;
  }
);

export const getAllowanceUsdtToLoanProtocol = createAsyncThunk(
  "loanProtocol/getAllowanceUsdtToLoanProtocol",
  async () => {
    const staticState = getStaticState();
    const usdt = staticState.usdt.contract;
    const addr = staticState.wallet.address;
    if (usdt && addr) {
      const newAllowanceUsdtToLoanProtocol = await usdt.allowance(
        addr,
        contractAddresses.loanProtocol
      );
      return { newAllowanceUsdtToLoanProtocol };
    } else return undefined;
  }
);

const loanProtocolSlice = createSlice({
  name: "loanProtocol",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        //@ts-ignore
        state.contract = action.payload?.newContract;
      })
      .addCase(getUserLoans.fulfilled, (state, action) => {
        state.userLoans = action.payload?.newUserLoans;
      })
      .addCase(getLoanRatio.fulfilled, (state, action) => {
        state.loanRatio = action.payload?.newLoanRatio;
      })
      .addCase(getUsdtAvailable.fulfilled, (state, action) => {
        state.usdtAvailable = action.payload?.newUsdtAvailable;
      })
      .addCase(getAllowanceAmtToLoanProtocol.fulfilled, (state, action) => {
        state.allowanceAmtToLoanProtocol =
          action.payload?.newAllowanceAmtToLoanProtocol;
      })
      .addCase(getAllowanceUsdtToLoanProtocol.fulfilled, (state, action) => {
        state.allowanceUsdtToLoanProtocol =
          action.payload?.newAllowanceUsdtToLoanProtocol;
      });
  },
});

export const generalLoadLoanProtocol = (dispatch: AppDispatch) => {
  dispatch(getAllowanceAmtToLoanProtocol());
  dispatch(getAllowanceUsdtToLoanProtocol());
  dispatch(createContract());
  dispatch(getUserLoans());
  dispatch(getLoanRatio());
  dispatch(getUsdtAvailable());
};
export const loanProtocolActions = loanProtocolSlice.actions;
export default loanProtocolSlice.reducer;
