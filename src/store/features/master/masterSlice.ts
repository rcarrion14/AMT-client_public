import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiMaster from "../../../contracts/abis/master.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";

export interface masterState {
  contract: any | null;

  alreadyCharged1: boolean | null | string;
  alreadyCharged2: boolean | null | string;
  alreadyCharged3: boolean | null | string;
  alreadyCharged4: boolean | null | string;
  alreadyCharged5: boolean | null | string;

  liqAlreadyCharged1: boolean | null | string;
  liqAlreadyCharged2: boolean | null | string;
  liqAlreadyCharged3: boolean | null | string;
  liqAlreadyCharged4: boolean | null | string;
  liqAlreadyCharged5: boolean | null | string;

  liqPays1: null | string;
  liqPays2: null | string;
  liqPays3: null | string;
  liqPays4: null | string;
  liqPays5: null | string;

  pays1: null | string;
  pays2: null | string;
  pays3: null | string;
  pays4: null | string;
  pays5: null | string;
}

const initialState: masterState = {
  contract: null,
  alreadyCharged1: null,
  alreadyCharged2: null,
  alreadyCharged3: null,
  alreadyCharged4: null,
  alreadyCharged5: null,

  liqAlreadyCharged1: null,
  liqAlreadyCharged2: null,
  liqAlreadyCharged3: null,
  liqAlreadyCharged4: null,
  liqAlreadyCharged5: null,

  liqPays1: null,
  liqPays2: null,
  liqPays3: null,
  liqPays4: null,
  liqPays5: null,

  pays1: null,
  pays2: null,
  pays3: null,
  pays4: null,
  pays5: null,
};

export const createContract = createAsyncThunk(
  "master/createContract",
  async () => {
    const signer = getStaticState().wallet.signer;
    if (signer) {
      const newContract = new ethers.Contract(
        contractAddresses.Master,
        abiMaster,
        signer
      );
      return { newContract };
    } else return null;
  }
);

export const getAlreadyCharged = createAsyncThunk(
  "master/getAlreadyCharged",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.master.contract;
    const address = staticState.wallet.address;
    if (contract) {
      const alreadyCharged1 = await contract.alreadyCharged(address, snapshot);
      const alreadyCharged2 = await contract.alreadyCharged(
        address,
        snapshot - 1
      );
      const alreadyCharged3 = await contract.alreadyCharged(
        address,
        snapshot - 2
      );
      const alreadyCharged4 = await contract.alreadyCharged(
        address,
        snapshot - 3
      );
      const alreadyCharged5 = await contract.alreadyCharged(
        address,
        snapshot - 4
      );
      return {
        alreadyCharged1,
        alreadyCharged2,
        alreadyCharged3,
        alreadyCharged4,
        alreadyCharged5,
      };
    } else {
      return null;
    }
  }
);

export const getLiqPays = createAsyncThunk(
  "master/getLiqPays",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.master.contract;
    if (contract) {
      const liqPays1 = (await contract.liqPays(snapshot)).toString();
      const liqPays2 = (await contract.liqPays(snapshot - 1)).toString();
      const liqPays3 = (await contract.liqPays(snapshot - 2)).toString();
      const liqPays4 = (await contract.liqPays(snapshot - 3)).toString();
      const liqPays5 = (await contract.liqPays(snapshot - 4)).toString();

      return {
        liqPays1,
        liqPays2,
        liqPays3,
        liqPays4,
        liqPays5,
      };
    } else {
      return null;
    }
  }
);

export const getPays = createAsyncThunk(
  "master/getPays",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.master.contract;
    if (contract) {
      const pays1 = (await contract.pays(snapshot)).toString();
      const pays2 = (await contract.pays(snapshot - 1)).toString();
      const pays3 = (await contract.pays(snapshot - 2)).toString();
      const pays4 = (await contract.pays(snapshot - 3)).toString();
      const pays5 = (await contract.pays(snapshot - 4)).toString();

      return {
        pays1,
        pays2,
        pays3,
        pays4,
        pays5,
      };
    } else {
      return null;
    }
  }
);

export const getLiqAlreadyCharged = createAsyncThunk(
  "master/getLiqAlreadyCharged",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.master.contract;
    const address = staticState.wallet.address;
    if (contract) {
      const alreadyCharged1 = await contract.liqAlreadyCharged(
        address,
        snapshot
      );
      const alreadyCharged2 = await contract.liqAlreadyCharged(
        address,
        snapshot - 1
      );
      const alreadyCharged3 = await contract.liqAlreadyCharged(
        address,
        snapshot - 2
      );
      const alreadyCharged4 = await contract.liqAlreadyCharged(
        address,
        snapshot - 3
      );
      const alreadyCharged5 = await contract.liqAlreadyCharged(
        address,
        snapshot - 4
      );
      return {
        alreadyCharged1,
        alreadyCharged2,
        alreadyCharged3,
        alreadyCharged4,
        alreadyCharged5,
      };
    } else {
      return null;
    }
  }
);

export const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContract.fulfilled, (state, action) => {
        state.contract = action.payload?.newContract;
      })
      .addCase(getAlreadyCharged.fulfilled, (state, action) => {
        state.alreadyCharged1 = action.payload?.alreadyCharged1;
        state.alreadyCharged2 = action.payload?.alreadyCharged2;
        state.alreadyCharged3 = action.payload?.alreadyCharged3;
        state.alreadyCharged4 = action.payload?.alreadyCharged4;
        state.alreadyCharged5 = action.payload?.alreadyCharged5;
      })
      .addCase(getAlreadyCharged.pending, (state) => {
        state.alreadyCharged1 = "requesting";
        state.alreadyCharged2 = "requesting";
        state.alreadyCharged3 = "requesting";
        state.alreadyCharged4 = "requesting";
        state.alreadyCharged5 = "requesting";
      })
      .addCase(getLiqAlreadyCharged.fulfilled, (state, action) => {
        state.liqAlreadyCharged1 = action.payload?.alreadyCharged1;
        state.liqAlreadyCharged2 = action.payload?.alreadyCharged2;
        state.liqAlreadyCharged3 = action.payload?.alreadyCharged3;
        state.liqAlreadyCharged4 = action.payload?.alreadyCharged4;
        state.liqAlreadyCharged5 = action.payload?.alreadyCharged5;
      })
      .addCase(getLiqAlreadyCharged.pending, (state) => {
        state.liqAlreadyCharged1 = "requesting";
        state.liqAlreadyCharged2 = "requesting";
        state.liqAlreadyCharged3 = "requesting";
        state.liqAlreadyCharged4 = "requesting";
        state.liqAlreadyCharged5 = "requesting";
      })
      .addCase(getLiqPays.fulfilled, (state, action) => {
        state.liqPays1 = action.payload?.liqPays1;
        state.liqPays2 = action.payload?.liqPays2;
        state.liqPays3 = action.payload?.liqPays3;
        state.liqPays4 = action.payload?.liqPays4;
        state.liqPays5 = action.payload?.liqPays5;
      })
      .addCase(getLiqPays.pending, (state) => {
        state.liqPays1 = "requesting";
        state.liqPays2 = "requesting";
        state.liqPays3 = "requesting";
        state.liqPays4 = "requesting";
        state.liqPays5 = "requesting";
      })
      .addCase(getPays.fulfilled, (state, action) => {
        state.pays1 = action.payload?.pays1;
        state.pays2 = action.payload?.pays2;
        state.pays3 = action.payload?.pays3;
        state.pays4 = action.payload?.pays4;
        state.pays5 = action.payload?.pays5;
      })
      .addCase(getPays.pending, (state) => {
        state.pays1 = "requesting";
        state.pays2 = "requesting";
        state.pays3 = "requesting";
        state.pays4 = "requesting";
        state.pays5 = "requesting";
      });
  },
});

const generalLoad = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(createContract());
  dispatch(getAlreadyCharged(maxSnapshot));
  dispatch(getLiqAlreadyCharged(maxSnapshot));
  dispatch(getLiqPays(maxSnapshot));
  dispatch(getPays(maxSnapshot));
};

const loadAlreadyCharged = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getAlreadyCharged(maxSnapshot));
};
const loadLiqAlreadyCharged = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getLiqAlreadyCharged(maxSnapshot));
};

const loadLiqPays = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getLiqPays(maxSnapshot));
};

const loadPays = (dispatch: AppDispatch, maxSnapshot: number) => {
  dispatch(getPays(maxSnapshot));
};

export const masterLoaders = {
  generalLoad,
  loadAlreadyCharged,
  loadLiqAlreadyCharged,
  loadLiqPays,
  loadPays,
};

export const masterActions = masterSlice.actions;

export default masterSlice.reducer;
