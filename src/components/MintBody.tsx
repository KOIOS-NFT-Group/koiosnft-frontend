import { Network } from "../services/Network";
import ABI from "../services/ContractABI";
import { Button } from "@chakra-ui/button";
import { Moralis } from "moralis";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import confirmationHooray from "../assets/hooray.gif";

const MintBody = ({ chainId, name }: Network) => {
  const [txHash, setTxHash] = useState("");
  const [confirmed, setConfirmation] = useState(false);

  const CONTRACT_ADDRESS = "0xbc7dced78438d564057a0f7fdb216c6194411603";
  let web3 = undefined;
  let account = undefined;
  let contract = undefined;

  const mintToken = async () => {
    web3 = await Moralis.Web3.enable();

    const accounts = await web3.eth.getAccounts();

    contract = new web3.eth.Contract(ABI as AbiItem[], CONTRACT_ADDRESS);
    contract.defaultChain = "rinkeby";
    account = accounts[0];

    contract.methods
      .mint(1)
      .send({
        from: account,
        value: Web3.utils.toWei("0.001", "ether"),
      })
      .on("transactionHash", function (hash: string) {
        setTxHash(hash);
      })
      .on("confirmation", function () {
        setConfirmation(true);
      });
  };

  const values = useBreakpointValue({
    base: (
      <Button variant="outline" fontWeight="bold" m={5}>
        Transaction
      </Button>
    ),
    md: (
      <Button variant="outline" fontWeight="bold" m={5}>
        Transaction: {txHash}
      </Button>
    ),
  });

  const renderHash = () => {
    if (txHash != "") {
      const url = "https://rinkeby.etherscan.io/tx/" + txHash;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener"
          title="Click to view transaction!"
        >
          {values}
        </a>
      );
    } else {
      return;
    }
  };

  const hooray = () => {
    if (confirmed) {
      return (
        <VStack p={5}>
          <Center>
            <Text mb={2}>🎉 Successfully minted your NFT! 🎉</Text>
          </Center>
          <Image
            borderRadius="md"
            src={confirmationHooray}
            boxSize="200px"
          ></Image>
          <Center>
            <Text mb={2}>Head over to the Dashboard! 🍌</Text>
          </Center>
        </VStack>
      );
    } else {
      return;
    }
  };

  if (name === "rinkeby") {
    return (
      <VStack>
        <Button m={5} onClick={() => mintToken()}>
          Mint!
        </Button>
        {renderHash()}
        {hooray()}
      </VStack>
    );
  } else {
    return <Heading m={5}>Please, change network to Rinkeby</Heading>;
  }
};

export default MintBody;
