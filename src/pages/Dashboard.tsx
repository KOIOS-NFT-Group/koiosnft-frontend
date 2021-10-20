import { Grid, GridItem, Link, Text, VStack } from "@chakra-ui/layout";
import "./Dashboard.css";
import Content from "../components/Content";
import Navbar from "../components/Navbar";
import { initWeb3, getNetwork, getNetworkName } from "../services/init";
import { useState, useEffect } from "react";
import Moralis from "moralis";
import { Button } from "@chakra-ui/button";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { update } from "../features/network/network-slice";
import NetworkState from "../features/network/NetworkState";

function Dashboard() {
  const [re, setRe] = useState(false);

  const [hasWeb3, setWeb3] = useState(false);

  let chainIdDefault: number = 1;
  const [chainId, setChainId] = useState(chainIdDefault);

  Moralis.Web3.onChainChanged(function () {
    setRe(!re);
  });

  useEffect(() => {
    async function hasMetamask() {
      let result = await initWeb3();
      if (result) {
        setWeb3(true);
      } else setWeb3(false);
    }
    hasMetamask();

    async function getTheChainId() {
      let result = await getNetwork();
      if (result === 1 || result === 4 || result === 137) {
        setChainId(result);
      } else {
        setChainId(42069);
      }
    }
    getTheChainId();
  });

  if (hasWeb3) {
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
