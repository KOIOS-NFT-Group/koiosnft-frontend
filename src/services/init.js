import Web3 from "web3";

let web3 = undefined;

export async function initWeb3() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    return true;
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    return true;
  }

  return false;
}

export async function getNetwork() {
  if (window.ethereum || window.web3) {
    return web3.eth.net.getId();
  }
}

export function getNetworkName(chainID) {
  let networks = {
    1: "Mainnet 🍺",
    4: "Rinkeby ☕️",
  };
  return networks[chainID];
}
