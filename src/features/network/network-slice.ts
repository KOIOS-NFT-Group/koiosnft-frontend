import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Web3 from "web3";
import NetworkState from "./NetworkState";

const initialState: NetworkState = {
  loading: false,
  chainId: 1,
  network: "eth",
  web3: null,
  account: "",
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    update(state, action: PayloadAction<NetworkState>) {
      state.loading = action.payload.loading;
      state.network = action.payload.network;
      state.chainId = action.payload.chainId;
      state.account = action.payload.account;
      state.web3 = action.payload.web3;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const { update, toggleLoading } = networkSlice.actions;
export default networkSlice.reducer;
