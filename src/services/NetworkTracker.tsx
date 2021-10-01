import Moralis from "moralis";
import { useMoralis } from "react-moralis";

function checkWeb3() {
  SetWeb3Environment();
}

async function SetWeb3Environment() {
  const { logout } = useMoralis();

  Moralis.Web3.onAccountsChanged(function () {
    window.location.reload();
    logout();
  });
}

export default checkWeb3;
