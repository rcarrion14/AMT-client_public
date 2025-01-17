import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers, BigNumber } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiVaultAmt from "../../../contracts/abis/vaultAmt.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";
function delay(t: any, v: any) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}
interface vaultAmtState {
  contract: any | undefined;
  balanceAmt: BigNumber | undefined;
  balanceUserAmt: BigNumber | undefined;
  balanceAmt1: BigNumber | undefined;
  balanceAmt2: BigNumber | undefined;
  balanceAmt3: BigNumber | undefined;
  balanceAmt4: BigNumber | undefined;
  balanceAmt5: BigNumber | undefined;
  getNewDataTrigger: Boolean;
  amtGeneratedWaitingForUpdate: Boolean;
}

const initialState: vaultAmtState = {
  contract: null,
  balanceAmt: undefined,
  balanceUserAmt: undefined,
  balanceAmt1: undefined,
  balanceAmt2: undefined,
  balanceAmt3: undefined,
  balanceAmt4: undefined,
  balanceAmt5: undefined,
  getNewDataTrigger: false,
  amtGeneratedWaitingForUpdate: false,
};

export const createContract = createAsyncThunk(
  "vaultAmt/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.VaultAmt,
        abiVaultAmt,
        signer
      );
      return { newContract };
    }
  }
);

export const setGetNewDataTrigger = createAsyncThunk(
  "vaultAmt/setGetNewDataTrigger",
  async () => {
    const actualTrigger = getStaticState().vaultAmt.getNewDataTrigger;
    console.log("pre wait");
    await delay(8000, 0);
    console.log("post wait");
    const newGetNewDataTrigger = !actualTrigger;
    console.log(newGetNewDataTrigger);
    return { newGetNewDataTrigger };
  }
);

export const setGeneratedAmtWaitingForUpdate = createAsyncThunk(
  "vaultAmt/setGeneratedAmtWaitingForUpdate",
  async (value: Boolean) => {
    const newValue = value;
    return { value };
  }
);

export const getBalanceAmt = createAsyncThunk(
  "vaultAmt/getBalanceAmt",
  async () => {
    const contract = getStaticState().vaultAmt.contract;
    if (contract) {
      const newBalance = formatter(await contract.amtStacked());
      return { newBalance };
    }
  }
);

export const getBalanceUserAmt = createAsyncThunk(
  "vaultAmt/getBalanceUserAmt",
  async () => {
    const contract = getStaticState().vaultAmt.contract;
    const address = getStaticState().wallet.address;
    if (contract) {
      const newBalance = formatter(await contract.addressAmt(address));
      return { newBalance };
    }
  }
);

export const getBalanceAt = createAsyncThunk(
  "vaultAmt/getBalanceAt",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.amt.contract;

    if (contract) {
      const balanceAt1 = formatter(
        await contract.balanceOfAt(contractAddresses.VaultAmt, snapshot)
      );
      const balanceAt2 = formatter(
        await contract.balanceOfAt(contractAddresses.VaultAmt, snapshot - 1)
      );
      const balanceAt3 = formatter(
        await contract.balanceOfAt(contractAddresses.VaultAmt, snapshot - 2)
      );
      const balanceAt4 = formatter(
        await contract.balanceOfAt(contractAddresses.VaultAmt, snapshot - 3)
      );
      const balanceAt5 = formatter(
        await contract.balanceOfAt(contractAddresses.VaultAmt, snapshot - 4)
      );

      return {
        balanceAt1,
        balanceAt2,
        balanceAt3,
        balanceAt4,
        balanceAt5,
      };
    } else return undefined;
  }
);

const vaultAmtSlice = createSlice({
  name: "vaultAmt",
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
      })
      .addCase(getBalanceAt.fulfilled, (state, action) => {
        state.balanceAmt1 = action.payload?.balanceAt1;
        state.balanceAmt2 = action.payload?.balanceAt2;
        state.balanceAmt3 = action.payload?.balanceAt3;
        state.balanceAmt4 = action.payload?.balanceAt4;
        state.balanceAmt5 = action.payload?.balanceAt5;
      })
      .addCase(getBalanceAt.pending, (state) => {
        state.balanceAmt1 = undefined;
        state.balanceAmt2 = undefined;
        state.balanceAmt3 = undefined;
        state.balanceAmt4 = undefined;
        state.balanceAmt5 = undefined;
      })
      .addCase(setGetNewDataTrigger.fulfilled, (state, action) => {
        state.getNewDataTrigger = action.payload.newGetNewDataTrigger;
      })
      .addCase(setGeneratedAmtWaitingForUpdate.fulfilled, (state, action) => {
        state.amtGeneratedWaitingForUpdate = action.payload.value;
      });
  },
});

export const vaultAmtActions = vaultAmtSlice.actions;
export default vaultAmtSlice.reducer;

export const generalLoadVaultAmt = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalanceAmt());
  dispatch(getBalanceUserAmt());
};
