import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers, BigNumber } from "ethers";
import contractAddresses from "../../../contracts/contractAddresses";
import abiMaster from "../../../contracts/abis/master.json";
import { getStaticState } from "../../store";
import { AppDispatch } from "../../store";
import { formatter } from "../formatter";

export interface masterState {
  contract: any | null;

  alreadyCharged1: boolean | null | undefined;
  alreadyCharged2: boolean | null | undefined;
  alreadyCharged3: boolean | null | undefined;
  alreadyCharged4: boolean | null | undefined;
  alreadyCharged5: boolean | null | undefined;

  liqAlreadyCharged1: boolean | null | undefined;
  liqAlreadyCharged2: boolean | null | undefined;
  liqAlreadyCharged3: boolean | null | undefined;
  liqAlreadyCharged4: boolean | null | undefined;
  liqAlreadyCharged5: boolean | null | undefined;

  liqPays1: undefined | BigNumber;
  liqPays2: undefined | BigNumber;
  liqPays3: undefined | BigNumber;
  liqPays4: undefined | BigNumber;
  liqPays5: undefined | BigNumber;

  pays1: undefined | BigNumber;
  pays2: undefined | BigNumber;
  pays3: undefined | BigNumber;
  pays4: undefined | BigNumber;
  pays5: undefined | BigNumber;
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

  liqPays1: undefined,
  liqPays2: undefined,
  liqPays3: undefined,
  liqPays4: undefined,
  liqPays5: undefined,

  pays1: undefined,
  pays2: undefined,
  pays3: undefined,
  pays4: undefined,
  pays5: undefined,
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
      const liqPays1 = formatter(await contract.liqPays(snapshot));
      const liqPays2 = formatter(await contract.liqPays(snapshot - 1));
      const liqPays3 = formatter(await contract.liqPays(snapshot - 2));
      const liqPays4 = formatter(await contract.liqPays(snapshot - 3));
      const liqPays5 = formatter(await contract.liqPays(snapshot - 4));

      return {
        liqPays1,
        liqPays2,
        liqPays3,
        liqPays4,
        liqPays5,
      };
    } else {
      return undefined;
    }
  }
);

export const getPays = createAsyncThunk(
  "master/getPays",
  async (snapshot: number) => {
    const staticState = getStaticState();
    const contract = staticState.master.contract;
    if (contract) {
      const pays1 = formatter(await contract.pays(snapshot));
      const pays2 = formatter(await contract.pays(snapshot - 1));
      const pays3 = formatter(await contract.pays(snapshot - 2));
      const pays4 = formatter(await contract.pays(snapshot - 3));
      const pays5 = formatter(await contract.pays(snapshot - 4));

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
        state.alreadyCharged1 = undefined;
        state.alreadyCharged2 = undefined;
        state.alreadyCharged3 = undefined;
        state.alreadyCharged4 = undefined;
        state.alreadyCharged5 = undefined;
      })
      .addCase(getLiqAlreadyCharged.fulfilled, (state, action) => {
        state.liqAlreadyCharged1 = action.payload?.alreadyCharged1;
        state.liqAlreadyCharged2 = action.payload?.alreadyCharged2;
        state.liqAlreadyCharged3 = action.payload?.alreadyCharged3;
        state.liqAlreadyCharged4 = action.payload?.alreadyCharged4;
        state.liqAlreadyCharged5 = action.payload?.alreadyCharged5;
      })
      .addCase(getLiqAlreadyCharged.pending, (state) => {
        state.liqAlreadyCharged1 = undefined;
        state.liqAlreadyCharged2 = undefined;
        state.liqAlreadyCharged3 = undefined;
        state.liqAlreadyCharged4 = undefined;
        state.liqAlreadyCharged5 = undefined;
      })
      .addCase(getLiqPays.fulfilled, (state, action) => {
        state.liqPays1 = action.payload?.liqPays1;
        state.liqPays2 = action.payload?.liqPays2;
        state.liqPays3 = action.payload?.liqPays3;
        state.liqPays4 = action.payload?.liqPays4;
        state.liqPays5 = action.payload?.liqPays5;
      })
      .addCase(getLiqPays.pending, (state) => {
        state.liqPays1 = undefined;
        state.liqPays2 = undefined;
        state.liqPays3 = undefined;
        state.liqPays4 = undefined;
        state.liqPays5 = undefined;
      })
      .addCase(getPays.fulfilled, (state, action) => {
        state.pays1 = action.payload?.pays1;
        state.pays2 = action.payload?.pays2;
        state.pays3 = action.payload?.pays3;
        state.pays4 = action.payload?.pays4;
        state.pays5 = action.payload?.pays5;
      })
      .addCase(getPays.pending, (state) => {
        state.pays1 = undefined;
        state.pays2 = undefined;
        state.pays3 = undefined;
        state.pays4 = undefined;
        state.pays5 = undefined;
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
