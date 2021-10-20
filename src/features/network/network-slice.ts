import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Web3 from "web3";
import NetworkState from "./NetworkState";

const initialState: NetworkState = {
  loading: false,
  chainId: 1,
  network: "eth",
  web3: false,
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
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    setWeb3(state, action: PayloadAction<boolean>) {
      state.web3 = action.payload;
    },
    updateAddress(state, action: PayloadAction<string>) {
      state.account = action.payload;
    },
  },
});

export const { update, toggleLoading, setWeb3, updateAddress } =
  networkSlice.actions;
export default networkSlice.reducer;
