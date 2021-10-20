export default interface NetworkState {
  loading: boolean;
  chainId: number;
  network: string;
  web3?: boolean;
  account: string;
}
