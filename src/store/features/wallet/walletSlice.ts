import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export interface WalletState {
  provider: any | null;
  signer: ethers.Signer | null;
  address: string | null;
  isConnecting: boolean;
  error: string | null;
}

const initialState: WalletState = {
  provider: null,
  signer: null,
  address: null,
  isConnecting: false,
  error: null,
};
declare var window: any;

export const connectWallet = createAsyncThunk(
  "wallet/connectWallet",
  async () => {
    const provider: ethers.providers.Web3Provider = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        return newProvider;
      });
    const signer = provider.getSigner();
    const address_ = await signer.getAddress();
    const address = address_.toLocaleLowerCase();
    return { provider, signer, address };
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.provider = action.payload.provider;
        state.signer = action.payload.signer;
        state.address = action.payload.address;
      })
      .addCase(connectWallet.pending, (state) => {
        state.isConnecting = true;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.isConnecting = false;
        state.error = action.error.message ?? "Error conectando la wallet";
      });
  },
});

export const walletActions = walletSlice.actions;
export default walletSlice.reducer;
