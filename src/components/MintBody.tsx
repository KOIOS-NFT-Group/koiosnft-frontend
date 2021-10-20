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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import confirmationHooray from "../assets/hooray.gif";

const MintBody = ({ chainId, networkName }: Network) => {
  const [txHash, setTxHash] = useState("");
  const [confirmed, setConfirmation] = useState(false);
  const [amount, setAmount] = useState(1);
  const [tokenId, setTokenId] = useState(0);

  const CONTRACT_ADDRESS = "0xc5d26Ed816da61e5d633BcEa3Fc0055BD81A96A7";
  let web3 = undefined;
  let account = undefined;
  let contract = undefined;

  const mintToken = async () => {
    web3 = await Moralis.Web3.enable();

    const accounts = await web3.eth.getAccounts();

    contract = new web3.eth.Contract(ABI as AbiItem[], CONTRACT_ADDRESS);
    contract.defaultChain = "rinkeby";
    account = accounts[0];

    const amountToPay = amount * 0.001 * 1000000000000000000;

    contract.methods
      .mint()
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
          switch (amount >= 2) {
            case true:
              for (let token of receipt.events.Transfer) {
                console.log("Token ID: " + token.returnValues.tokenId);
              }
              break;
            case false:
              let transfere: Transfer = receipt.events.Transfer;
              console.log("Token ID: " + transfere.returnValues.tokenId);
              setTokenId(transfere.returnValues.tokenId as unknown as number);
              break;
          }
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

  const handleChange = (value: number) => setAmount(value);

  if (networkName === "rinkeby") {
    return (
      <VStack>
        <NumberInput
          mb={2}
          size="md"
          defaultValue={1}
          min={1}
          max={5}
          onChange={(valueAsNumber) =>
            handleChange(valueAsNumber as unknown as number)
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text fontWeight="bold">Total: {amount * 0.001} ETH</Text>
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
