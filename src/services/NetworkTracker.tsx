import { useMoralis } from "react-moralis";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { updateAddress } from "../features/network/network-slice";

declare let window: any;

async function SetWeb3Environment() {
  // const { logout, user, Moralis } = useMoralis();
  // const dispatch = useAppDispatch();
  // const web3 = useAppSelector((state) => state.network.web3);
  // Moralis.Web3.onAccountsChanged(async function () {
  //   const accounts: string[] = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   console.log("accounts changed");
  //   dispatch(updateAddress(accounts[0]));
  // });
}

export default SetWeb3Environment;
