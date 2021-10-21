import { Grid, GridItem, Link, Text, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import "./Dashboard.css";
import Content from "../components/Content";
import Navbar from "../components/Navbar";
import { useMoralis } from "react-moralis";
import { initWeb3, getNetwork, getNetworkName } from "../services/init";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { updateAddress } from "../features/network/network-slice";
import NetworkState from "../features/network/NetworkState";
import SetWeb3Environment from "../services/NetworkTracker";
declare let window: any;

function Dashboard() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [re, setRe] = useState(false);

  const [hasWeb3, setWeb3] = useState(false);
  const web3 = useAppSelector((state) => state.network.web3);

  let chainIdDefault: number = 1;
  const [chainId, setChainId] = useState(chainIdDefault);

  const { isAuthenticated, Moralis, user, logout } = useMoralis();

  // Moralis.Web3.onChainChanged(function () {
  //   setRe(!re);
  // });
  async function getTheChainId() {
    let result = await getNetwork();
    if (result === 1 || result === 4 || result === 137) {
      setChainId(result);
    } else {
      setChainId(42069);
    }
  }
  //getTheChainId();
  // let accounts: string[] = [];
  // const fetch = async () => {
  //   accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  // };
  // window.ethereum.on("accountsChanged", () => {
  //   fetch();
  //   dispatch(updateAddress(accounts[0]));
  // });

  if (web3) {
    return (
      <Grid templateRows="repeat(10,1fr)" h="100vh">
        <GridItem rowSpan={1}>
          <Navbar
            chainId={chainId}
            networkName={getNetworkName(chainId)}
          ></Navbar>
        </GridItem>
        <GridItem rowSpan={9}>
          <Content chainId={chainId} networkName={getNetworkName(chainId)} />
        </GridItem>
      </Grid>
    );
  } else {
    return (
      <div className="centeredChildren">
        <VStack>
          <Text m={4} fontWeight="bold">
            No web3 wallet is detected. If you do, please unlock it and refresh.
          </Text>
          <Button onClick={() => window.location.reload()}>🔄 Refresh</Button>
          <Link
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            isExternal
          >
            <Button variant="outline">🎁 Extension</Button>
          </Link>
          <Link href="https://metamask.app.link/skAH3BaF99" isExternal>
            <Button variant="outline">🍎 App Store</Button>
          </Link>
          <Link href="https://metamask.app.link/bxwkE8oF99" isExternal>
            <Button variant="outline">🤖 Play Store</Button>
          </Link>
        </VStack>
      </div>
    );
  }
}

export default Dashboard;
