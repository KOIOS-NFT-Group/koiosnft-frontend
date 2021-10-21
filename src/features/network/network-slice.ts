import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Web3 from "web3";
import NetworkState from "./NetworkState";

declare let window: any;

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
    setWeb3(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.web3 = new Web3(window.ethereum);
      }
    },
    updateAddress(state, action: PayloadAction<string>) {
      console.log("Account: " + action.payload);
      state.account = action.payload;
    },
  },
});

export const { setWeb3, updateAddress } = networkSlice.actions;
export default networkSlice.reducer;
