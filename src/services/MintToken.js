import Moralis from "moralis";
import Web3 from "web3";
import ABI from "./ContractABI";

const CONTRACT_ADDRESS = "0xbc7dced78438d564057a0f7fdb216c6194411603";
let web3 = undefined;
let account = undefined;
let contract = undefined;

export async function Mint() {
  web3 = await Moralis.Web3.enable();

  const accounts = await web3.eth.getAccounts();

  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  account = accounts[0];

  contract.methods.mint(1).send({
    from: account,
    value: Web3.utils.toWei("0.001", "ether"),
  });
}
