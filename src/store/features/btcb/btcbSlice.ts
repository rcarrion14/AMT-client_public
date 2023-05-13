import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers, BigNumber } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiBtcb from "../../../contracts/abis/btcb.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";

export interface btcbState {
  contract: any | undefined;
  balance: BigNumber | undefined;

  allowanceMarketVault: BigNumber | undefined;
  allowanceVaultAmt: BigNumber | undefined;
  allowanceVaultBtcb: BigNumber | undefined;
  allowanceVaultBtcbLiq: BigNumber | undefined;
  allowanceMaster: BigNumber | undefined;
  balanceOfPool: BigNumber | undefined;

  precioEnUsdt: number | undefined;
}

const initialState: btcbState = {
  contract: undefined,
  balance: undefined,
  precioEnUsdt: undefined,
  allowanceMarketVault: undefined,
  allowanceVaultAmt: undefined,
  allowanceVaultBtcb: undefined,
  allowanceVaultBtcbLiq: undefined,
  allowanceMaster: undefined,
  balanceOfPool: undefined,
};

export const createContract = createAsyncThunk(
  "btcb/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.Btcb,
        abiBtcb,
        signer
      );
      return { newContract };
    } else return undefined;
  }
);

export const getBalance = createAsyncThunk("btcb/getBalance", async () => {
  const staticState = getStaticState();
  const contract = staticState.btcb.contract;
  const address = staticState.wallet.address;
  if (contract) {
    const newBalance = formatter(await contract.balanceOf(address));
    return { newBalance };
  } else return undefined;
});

export const getPrecioEnUsdt = createAsyncThunk(
  "btcb/getPrecioEnUsdt",
  async () => {
    const staticState = getStaticState();
    const contractBtcb = staticState.btcb.contract;
    const contractUsdt = staticState.usdt.contract;
    if (contractBtcb && contractUsdt) {
      const poolAddres = contractAddresses.poolUsdtBtcb;
      const balanceBtcb = formatter(await contractBtcb.balanceOf(poolAddres));
      const balanceUsdt = formatter(await contractUsdt.balanceOf(poolAddres));
      const precio = balanceUsdt.toNumber() / balanceBtcb.toNumber();
      return { precio };
    }
  }
);
export const getBalanceOfPool = createAsyncThunk(
  "btcb/getBalanceOfPool",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
    const address = contractAddresses.LiqPool;
    if (contract) {
      const newBalance = formatter(await contract.balanceOf(address));
      return { newBalance };
    } else return undefined;
  }
);

export const getAllowanceMarketVault = createAsyncThunk(
  "btcb/getAllowanceMarketVault",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.burnVault)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getAllowanceVaultAmt = createAsyncThunk(
  "btcb/getAllowanceVaultAmt",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultAmt)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getAllowanceVaultBtcb = createAsyncThunk(
  "btcb/getAllowanceVaultBtcb",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultBtcb)
      );
      return { newAllowance };
    } else return undefined;
  }
);

export const getAllowanceVaultBtcbLiq = createAsyncThunk(
  "btcb/getAllowanceVaultBtcbLiq",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.VaultBtcbLiq)
      );
      return { newAllowance };
    } else return undefined;
  }
);
export const getAllowanceMaster = createAsyncThunk(
  "btcb/getAllowanceMaster",
  async () => {
    const staticState = getStaticState();
    const contract = staticState.btcb.contract;
    const address = staticState.wallet.address;

    if (contract) {
      const newAllowance = formatter(
        await contract.allowance(address, contractAddresses.Master)
      );
      return { newAllowance };
    } else return undefined;
  }
);

const btcbSlice = createSlice({
  name: "btcb",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        state.contract = action.payload?.newContract;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.balance = action.payload?.newBalance;
      })
      .addCase(getBalance.pending, (state) => {
        state.balance = undefined;
      })
      .addCase(getPrecioEnUsdt.pending, (state) => {
        state.precioEnUsdt = undefined;
      })
      .addCase(getPrecioEnUsdt.fulfilled, (state, action) => {
        state.precioEnUsdt = action.payload?.precio;
      })
      .addCase(getAllowanceMarketVault.fulfilled, (state, action) => {
        state.allowanceMarketVault = action.payload?.newAllowance;
      })
      .addCase(getAllowanceMarketVault.pending, (state) => {
        state.allowanceMarketVault = undefined;
      })
      .addCase(getAllowanceVaultAmt.fulfilled, (state, action) => {
        state.allowanceVaultAmt = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultAmt.pending, (state) => {
        state.allowanceVaultAmt = undefined;
      })
      .addCase(getAllowanceVaultBtcb.fulfilled, (state, action) => {
        state.allowanceVaultBtcb = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultBtcb.pending, (state) => {
        state.allowanceVaultBtcb = undefined;
      })
      .addCase(getAllowanceVaultBtcbLiq.fulfilled, (state, action) => {
        state.allowanceVaultBtcbLiq = action.payload?.newAllowance;
      })
      .addCase(getAllowanceVaultBtcbLiq.pending, (state) => {
        state.allowanceVaultBtcbLiq = undefined;
      })
      .addCase(getAllowanceMaster.fulfilled, (state, action) => {
        state.allowanceMaster = action.payload?.newAllowance;
      })
      .addCase(getAllowanceMaster.pending, (state) => {
        state.allowanceMaster = undefined;
      })
      .addCase(getBalanceOfPool.fulfilled, (state, action) => {
        state.balanceOfPool = action.payload?.newBalance;
      })
      .addCase(getBalanceOfPool.pending, (state) => {
        state.balanceOfPool = undefined;
      });
  },
});
export const btcbActions = btcbSlice.actions;
export default btcbSlice.reducer;
export const generalLoadBtcb = (dispatch: AppDispatch) => {
  dispatch(createContract());
  dispatch(getBalance());
  dispatch(getAllowanceMarketVault());
  dispatch(getAllowanceMaster());
  dispatch(getAllowanceVaultAmt());
  dispatch(getAllowanceVaultBtcb());
  dispatch(getAllowanceVaultBtcbLiq());
  dispatch(getBalanceOfPool());
  dispatch(getPrecioEnUsdt());
};
