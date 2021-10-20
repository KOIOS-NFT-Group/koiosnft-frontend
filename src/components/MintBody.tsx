import { Network } from "../services/Network";
import ABI from "../services/ContractABI";
import { Button } from "@chakra-ui/button";
import { Moralis } from "moralis";
import { Transfer } from "./Receipt";
import { AbiItem } from "web3-utils";
import {
  Center,
  Heading,
  Text,
  VStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import confirmationHooray from "../assets/hooray.gif";
import { ipfsUpload } from "../services/IpfsStuff";

const MintBody = ({ chainId, networkName }: Network) => {
  const [txHash, setTxHash] = useState("");
  const [confirmed, setConfirmation] = useState(false);
  const [tokenId, setTokenId] = useState(0);

  const CONTRACT_ADDRESS = "0x3EeFE5af0459c73a77ae20a6D2642d4AbF936FB5";
  let web3 = undefined;
  let account = undefined;
  let contract = undefined;

  const mintToken = async () => {
    web3 = await Moralis.Web3.enable();

    const accounts = await web3.eth.getAccounts();

    contract = new web3.eth.Contract(ABI as AbiItem[], CONTRACT_ADDRESS);
    contract.defaultChain = "rinkeby";
    account = accounts[0];

    const amountToPay = 0.001 * 1000000000000000000;

    const generate = () => {
      console.log("Art is generating...");
    };
    const amount: number = await contract.methods.totalSupply().call();
    console.log(+amount + 1);
    const tokenHash = await ipfsUpload(+amount + 1);
    console.log("Token Hash is: " + tokenHash);
    contract.methods
      .mint(tokenHash)
      .send({
        from: account,
        value: amountToPay,
      })
      .on("transactionHash", function (hash: string) {
        setTxHash(hash);
      })
      .on("confirmation", function (confirmationNumber: number, receipt: any) {
        if (confirmationNumber === 0) {
          setConfirmation(true);

          let transfere: Transfer = receipt.events.Transfer;
          console.log("Token ID: " + transfere.returnValues.tokenId);
          generate();
          setTokenId(transfere.returnValues.tokenId as unknown as number);
        }
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
    if (txHash !== "") {
      const url = "https://rinkeby.etherscan.io/tx/" + txHash;
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
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
            <Text mb={2}>
              🎉 Successfully minted your NFT! ID: {tokenId} 🎉
            </Text>
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

  if (networkName === "rinkeby") {
    return (
      <VStack>
        <Text fontWeight="bold">Total: 0.001 ETH</Text>
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
